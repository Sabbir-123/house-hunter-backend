import { ENUM_USER_ROLE } from "../enums/enums";
import { IGenericErrorMessage } from "./error";

export type IgenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMesages: IGenericErrorMessage[];
};

export type IpaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
  };
  data: T;
};


export type ILoginUser = {
  email: string;
  password: string;
  role: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};