import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookingService } from "./Renter.service";

const createBooking: RequestHandler = catchAsync(
    async (req: Request, res: Response) => {
      const { ...userData } = req.body;
      const order = await BookingService.createOrder(userData);
  
      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Booking created successfully!",
        data: order,
      });
    }
  );

  export const RenterController = {
    createBooking,
   
  };
  