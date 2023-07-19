import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { generateUseId } from "./user.util";
import config from "../../../config";
import { ILoginUserResponse, IRefreshTokenResponse } from "../../../Interfaces/common";


const creatrUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;

  // Generate user ID based on the role
  const userId = await generateUseId(user.role);
  console.log(userId)

  // Create a new user object with the generated ID
  const newUser = {
    id: userId,
    password: user.password,
    role: user.role,
    name: user.name,
    phoneNumber: user.phoneNumber,
    email: user.email,
    
  };

  // Call the UserService createUser function with the new user object
  const result = await UserService.createUser(newUser);
console.log(result)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User created Successfully",
    data: result,
  });
});

//login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...logInData } = req.body;
  const result = await UserService.loginUser(logInData);
  const { refreshToken, ...others } = result;

  const cookiesOptions = {
    httpOnly: true,
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: others,
  });
});

//refresh token
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshTokenService(refreshToken);

  const cookiesOptions = {
    httpOnly: true,
    secure: config.env === "production",
  };

  res.cookie("refreshToken", refreshToken, cookiesOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully",
    data: result,
  });
});

const isOwner = catchAsync(async (req: Request, res: Response) => {
  // searching, filtering and pagination
  const email = req.params.email;

  const result = await UserService.isOwner(email);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Owner retrieved Successfully",
    data: result,
  });
});







export const UserController = {
  creatrUser,
  isOwner,
  loginUser,
  refreshToken,
 

};
