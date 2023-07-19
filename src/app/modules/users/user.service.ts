
import {

	ILoginUser,
	ILoginUserResponse,
	IRefreshTokenResponse,

} from "../../../Interfaces/common";
import config from "../../../config/index";
import ApiError from "../../../error/ApiError";


import {  IUser } from "./user.interface";
import { User } from "./user.model";
import { generateUseId } from "./user.util";

import httpStatus from "http-status";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";

const createUser = async (user: IUser): Promise<IUser | null> => {
	// auto generated incremental id
	const id = await generateUseId(user.role);
	user.id = id;

	const createdUser = await User.create(user);
	if (!createdUser) {
		throw new ApiError("Failed to create User", 400);
	}
	return createdUser;
};
const isOwner = async (email: string): Promise<boolean> => {
	const user = await User.findOne({ email });
	if (!user) {
	  throw new ApiError("User not found", httpStatus.NOT_FOUND);
	}
	return user.role === "owner";
  };


//login
const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
	const { email, password } = payload;
	//check user exist

	const user = new User();
	const isUserExist = await user.isUserExist(email);

	if (!isUserExist) {
		throw new ApiError("User not found", httpStatus.NOT_FOUND);
	}
	//match password
	if (
		isUserExist.password &&
		!(await user.isPasswordMatched(password, isUserExist.password))
	) {
		throw new ApiError("Password is incorrect", httpStatus.UNAUTHORIZED);
	}

	const { phoneNumber: userPhoneNumber, role, email: userEmail, id:userId } = isUserExist;

	const accessToken = jwtHelpers.createToken(
		{ userPhoneNumber, role, userEmail , userId},
		config.jwt.secret as Secret,
		config.jwt.access_expires_in as string,
	);
	const refreshToken = jwtHelpers.createToken(
		{ userPhoneNumber, role, userEmail, userId },
		config.jwt.refresh_secret as Secret,
		config.jwt.refresh_expires_in as string,
	);

	return {
		accessToken,
		refreshToken,
	};
};

//refresh token

const refreshTokenService = async (
	token: string,
): Promise<IRefreshTokenResponse> => {
	let verifiedToken = null;
	//verify token
	try {
		verifiedToken = jwtHelpers.verifyToken(
			token,
			config.jwt.refresh_secret as Secret,
		);
	} catch (err) {
		throw new ApiError("Invalid Refresh Token", httpStatus.FORBIDDEN);
	}
	//check user exist
	const { userEmail } = verifiedToken;
	const user = new User();
	const isUserExist = await user.isUserExist(userEmail);
	if (!isUserExist) {
		throw new ApiError("user not found", httpStatus.NOT_FOUND);
	}
	//create new access token
	const newAccessToken = jwtHelpers.createToken(
		{ id: isUserExist.id, role: isUserExist.role },
		config.jwt.secret as Secret,
		config.jwt.access_expires_in as string,
	);

	return {
		accessToken: newAccessToken,
	};
};



export const UserService = {
	createUser,
	isOwner,
	loginUser,
	refreshTokenService
};
