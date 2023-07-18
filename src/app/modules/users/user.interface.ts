import { Model } from "mongoose";

export enum ROLE_BASED {
  OWNER = "owner",
  RENTER = "renter",
}

export type IUser = {
  id: string;
  password: string;
  role: ROLE_BASED;
  name: string;
  phoneNumber: string;
  email: string;
};

export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type IHouseHunterFilter = {
  searchTerm?: string;
};
