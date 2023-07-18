import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IBookings } from "./Renter.interface";
import { House } from "../HouseOwner/owner.model";


import { Booking } from "./Renter.model";
import mongoose from "mongoose";
import { Label } from "../HouseOwner/Owner.constant";

const createOrder = async (payload: IBookings): Promise<IBookings> => {
    const { house, name, email, phone_number } = payload;
    console.log(house, name, email, phone_number);
  
    const existingHouse = await House.findById(house);
    console.log(existingHouse);
    if (!existingHouse) {
      throw new ApiError("Invalid House reference ID", httpStatus.BAD_REQUEST);
    }
  
    const existingOrder = await Booking.findOne(payload);
    if (existingOrder) {
      throw new ApiError("Already Booked this House", httpStatus.BAD_REQUEST);
    }
  
    const renterBookings = await Booking.find({ phone_number: phone_number });
    if (renterBookings.length >= 2) {
      throw new ApiError(
        "You have already booked two houses. Please free up space for new bookings.",
        httpStatus.BAD_REQUEST
      );
    }
  
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      existingHouse.label = Label.Rented;
      await existingHouse.save();
  
      // Create the order
      const createdOrder = await Booking.create(payload);
  
      await session.commitTransaction();
      session.endSession();
  
      return createdOrder;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
  

export const BookingService = {
	createOrder,
};
