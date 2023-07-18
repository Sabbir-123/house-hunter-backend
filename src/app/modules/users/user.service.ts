import { SortOrder } from "mongoose";
import {
	IGenericResponse,
	ILoginUser,
	ILoginUserResponse,
	IRefreshTokenResponse,
	IpaginationOptions,
} from "../../../Interfaces/common";
import config from "../../../config/index";
import ApiError from "../../../error/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { HouseHunterSearchableFields } from "./user.constant";

import { IHouseHunterFilter, IUser } from "./user.interface";
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

const getAllUsers = async (
	filters: IHouseHunterFilter,
	paginationOptions: IpaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
	//filtering and searching
	const { searchTerm, ...filtersData } = filters;
	const andCondition = [];
	// dynamically searching
	if (searchTerm) {
		andCondition.push({
			$or: HouseHunterSearchableFields.map((field) => ({
				[field]: {
					$regex: searchTerm,
					$options: "i",
				},
			})),
		});
	}
	// dynamically filtering
	if (Object.keys(filtersData).length) {
		andCondition.push({
			$and: Object.entries(filtersData).map(([field, value]) => ({
				[field]: value,
			})),
		});
	}

	const { page, limit, skip, sortBy, sortOrder } =
		paginationHelpers.calculatePagination(paginationOptions);
	const sortConditions: { [key: string]: SortOrder } = {};
	if (sortBy && sortOrder) {
		sortConditions[sortBy] = sortOrder;
	}

	const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
	const result = await User.find(whereCondition)
		.sort(sortConditions)
		.skip(skip)
		.limit(limit);
	const total = await User.countDocuments();
	return {
		meta: {
			page,
			limit,
			total,
		},
		data: result,
	};
};

// single user
const getSingleUser = async (id: string): Promise<IUser | null> => {
	const result = await User.findById(id);
	return result;
};

const updateSingleUser = async (
	id: string,
	payload: Partial<IUser>,
): Promise<IUser | null> => {
	const result = await User.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
	const result = await User.findOneAndDelete({ _id: id });
	return result;
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

	const { phoneNumber: userPhoneNumber, role, email: userEmail } = isUserExist;

	const accessToken = jwtHelpers.createToken(
		{ userPhoneNumber, role, userEmail },
		config.jwt.secret as Secret,
		config.jwt.access_expires_in as string,
	);
	const refreshToken = jwtHelpers.createToken(
		{ userPhoneNumber, role, userEmail },
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

const myProfile = async (
	accessToken: string,
): Promise<Partial<IUser> | null | undefined> => {
	if (accessToken) {
		const decodedToken = jwtHelpers.decodeToken(accessToken);
		const { userPhoneNumber } = decodedToken;
		const user = await User.findOne({ phoneNumber: userPhoneNumber })
			.select("name phoneNumber address")
			.lean();

		if (!user) {
			throw new ApiError("User not found", httpStatus.NOT_FOUND);
		}
		return user;
	}
};

export const UserService = {
	createUser,
	getAllUsers,
	getSingleUser,
	updateSingleUser,
	deleteUser,
	loginUser,
	refreshTokenService,
	myProfile,
};
