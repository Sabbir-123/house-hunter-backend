import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { HouseHunterHouseFilterableFields } from "./Owner.constant";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/Paginationconstants";
import sendResponse from "../../../shared/sendResponse";
import { IHouse } from "./owner.interface";
import httpStatus from "http-status";
import { HouseService } from "./owner.service";
const getAllHouses = catchAsync(async (req: Request, res: Response) => {
	// searching, filtering and pagination
	const filters = pick(req?.query, HouseHunterHouseFilterableFields);
	const paginationOptions = pick(req?.query, paginationFields);

	const result = await HouseService.getAllHouses(filters, paginationOptions);
	sendResponse<IHouse[]>(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "House retrieved Successfully",
		meta: result.meta,
		data: result.data,
	});
});


const getOwnedHouse = catchAsync(async (req: Request, res: Response) => {
	const email = req.params.email as string;
  console.log(email)
	if (!email) {
	  return sendResponse(res, {
		success: false,
		statusCode: httpStatus.BAD_REQUEST,
		message: "Email parameter is missing",
		data: null,
	  });
	}
  
	try {
	  const result = await HouseService.getOwnedHouse(email);
	  console.log(result);
	  sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Owner's Houses retrieved successfully",
		data: result,
	  });
	} catch (error) {
	  console.error(error);
	  sendResponse(res, {
		success: false,
		statusCode: httpStatus.INTERNAL_SERVER_ERROR,
		message: "An error occurred",
		data: null,
	  });
	}
  });
  

const addHouse = catchAsync(async (req: Request, res: Response) => {
	const {
		name,
		owner,
		address,
		city,
		bedrooms,
		bathrooms,
		room_size,
		picture,
		availability_date,
		rent_per_month,
		phone_number,
		description,
		email,
        label
	} = req.body;

	// Create a new House object
	const newHouse = {
		name,
		owner,
		address,
		city,
        label,
		bedrooms,
		email,
		bathrooms,
		room_size,
		picture,
		availability_date,
		rent_per_month,
		phone_number,
		description,
	};

	// Call the HouseService createHouse function with the new House object
	const result = await HouseService.createHouse(newHouse);

	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "House created successfully",
		data: result,
	});
});


const updateHouse = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await HouseService.updateSingleHouse(id, updatedData);
    sendResponse<IHouse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "House Updated Successfully",
      data: result,
    });
  });

  const getSingleHouse = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await HouseService.getSingleHouse(id);
    sendResponse<IHouse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "House Retreived Successfully",
      data: result,
    });
  });
  const deleteSingleHouse = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await HouseService.deleteHouse(id);
    sendResponse<IHouse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "House Deleted Successfully",
      data: result,
    });
  });


export const HouseController = {
	getAllHouses,
	getOwnedHouse,
	addHouse,
    updateHouse,
    deleteSingleHouse,
    getSingleHouse
};
