import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BookingService } from "./Renter.service";
import { IBookings } from "./Renter.interface";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

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


  const getAllBookings = catchAsync(async (req: Request, res: Response) => {
    const accessToken = req.headers.authorization?.split(" ")[0]; // Fixed the split index to retrieve the token
    let result: IBookings[] = [];
    if (accessToken) {
      const decodedToken = jwtHelpers.decodeToken(accessToken); // Decode the access token
      const { userPhoneNumber } = decodedToken;
      console.log(decodedToken);
  
      result = await BookingService.getAllBookings(userPhoneNumber);
  
      sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Bookings retrieved successfully!",
        data: result,
      });
    }
  });
  
const deleteSingleBooking = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const email = req.query.email as string
    const result = await BookingService.deleteBooking(id, email);
    sendResponse<IBookings>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Booking Deleted Successfully",
      data: result,
    });
  });


  export const RenterController = {
    createBooking,
    getAllBookings,
    deleteSingleBooking
  };
  