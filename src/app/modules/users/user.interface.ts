import { Model } from "mongoose";



export type IUser = {
  id: string;
  password: string;
  role: string;
  name: string;
  phoneNumber: string;
  email: string;
};

export type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;

export type ICowHutFilter = {
  searchTerm?: string;
};
