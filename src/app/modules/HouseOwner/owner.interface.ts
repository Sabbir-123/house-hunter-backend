import { Model } from "mongoose";

import { Label } from "./Owner.constant";

export type IHouse ={
 
    name: string;
    email?:string;
    address: string;
    city: string;
    bedrooms: number;
    bathrooms: number;
    room_size: number;
    picture: string;
    label: Label;
    availability_date: Date;
    rent_per_month: number;
    phone_number: string;
    description: string;
  }


  export type HouseModel = Model<IHouse, Record<string, unknown>>;

  export type IHouseHunterHouseFilter = {
    searchTerm?: string;
    city?: string;
    bedrooms?: number;
    bathrooms?: number;
    room_size?: string;
    availability_date?: string;
    rent_per_month?: number;
  };
  

  