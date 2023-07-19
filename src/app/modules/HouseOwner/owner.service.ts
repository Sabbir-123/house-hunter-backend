import { SortOrder } from "mongoose";
import { IGenericResponse, IpaginationOptions } from "../../../Interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IHouse, IHouseHunterHouseFilter } from "./owner.interface";
import { House } from "./owner.model";
import { HouseHunterHouseSearchableFields } from "./Owner.constant";
import ApiError from "../../../error/ApiError";

const getAllHouses = async (
    filters: IHouseHunterHouseFilter,
    paginationOptions: IpaginationOptions
  ): Promise<IGenericResponse<IHouse[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const andCondition = [];
  
    // Dynamically searching
    if (searchTerm) {
      andCondition.push({
        $or: HouseHunterHouseSearchableFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        })),
      });
    }
  
    // Dynamically filtering
    if (Object.keys(filtersData).length) {
      andCondition.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
  
    
  
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
  
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = await House.find(whereCondition)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = await House.countDocuments(whereCondition);
  
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };

  const getOwnedHouse = async (email: string): Promise<IHouse[] | null> => {
    const houses = await House.find({ email: email });
    return houses;
  }

const createHouse = async (NewHouse: IHouse): Promise<IHouse> =>{
    const createdHouse = await House.create(NewHouse)
    if (!createdHouse) {
        throw new ApiError("Failed to create House", 400);
      }
      return createdHouse;
}

const updateSingleHouse = async (
    id: string,
    payload: Partial<IHouse>
  ): Promise<IHouse | null> => {
    const result = await House.findOneAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return result;
  };


  const getSingleHouse = async (id: string): Promise<IHouse | null> => {
    const result = await House.findOne({ _id: id });
    return result;
  };
  
  const deleteHouse = async (id: string): Promise<IHouse | null> => {
    const result = await House.findOneAndDelete({ _id: id });
    return result;
  };
  

  export const HouseService = {
    updateSingleHouse,
    getAllHouses,
    getOwnedHouse,
    createHouse,
    deleteHouse,
    getSingleHouse
  };
  