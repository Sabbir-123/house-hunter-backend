import httpStatus from "http-status";
import ApiError from "../../../error/ApiError";
import { IBookings } from "./Renter.interface";
import { House } from "../HouseOwner/owner.model";


import { Booking } from "./Renter.model";
import mongoose from "mongoose";
import { Label } from "../HouseOwner/Owner.constant";
import { User } from "../users/user.model";
import { ROLE_BASED } from "../users/user.interface";

const createOrder = async (payload: IBookings): Promise<IBookings> => {
    const { house, email, phone_number } = payload;
  
    const existingHouse = await House.findById(house);
    if (!existingHouse) {
      throw new ApiError("Invalid House reference ID", httpStatus.BAD_REQUEST);
    }
  
    const existingOrder = await Booking.findOne(payload);
    if (existingOrder) {
      throw new ApiError("Already Booked this House", httpStatus.BAD_REQUEST);
    }
  
    const user = await User.findOne({email});
    if (!user) {
      throw new ApiError("Invalid User ID", httpStatus.BAD_REQUEST);
    }
  console.log("hi",user)
    if (user.role! === ROLE_BASED.OWNER) {
      throw new ApiError("Owners cannot create orders", httpStatus.BAD_REQUEST);
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
  


  const getAllBookings = async (userPhoneNumber: string): Promise<IBookings[]> => {
    const buyer = await User.findOne({ userPhoneNumber }).exec(); // Assuming you have a Buyer model
    if (!buyer) {
      throw new Error("Renter not found");
    }

    const orders = await Booking.find({
        userPhoneNumber
    });
    return orders;
  };


  const deleteBooking = async (id: string, email:string): Promise<IBookings | null> => {
    const result = await Booking.findOneAndDelete({ _id: id, email });
    return result;
  };


export const BookingService = {
	createOrder,
    getAllBookings,
    deleteBooking
};
