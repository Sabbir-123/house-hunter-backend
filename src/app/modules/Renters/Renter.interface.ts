import { Model, Types } from "mongoose";
import { IHouse } from "../HouseOwner/owner.interface";

export type IBookings ={
    house: Types.ObjectId | IHouse | undefined | null; 
    name: string;
    email: string;
    phone_number: string;
  }


  export type BookingModel = Model<IBookings, Record<string, unknown>>;