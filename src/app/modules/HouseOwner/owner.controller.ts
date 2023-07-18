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
	console.log(req.params.id);
	const result = await HouseService.getOwnedHouse(req.params.id);
	console.log(result);
	sendResponse<IHouse[]>(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Owner's Houses retrieved Successfully",
		data: result,
	});
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
	} = req.body;

	// Create a new House object
	const newHouse = {
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

export const HouseController = {
	getAllHouses,
	getOwnedHouse,
	addHouse,
};
