"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const Owner_constant_1 = require("./Owner.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const Paginationconstants_1 = require("../../../constants/Paginationconstants");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const owner_service_1 = require("./owner.service");
const getAllHouses = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // searching, filtering and pagination
    const filters = (0, pick_1.default)(req === null || req === void 0 ? void 0 : req.query, Owner_constant_1.HouseHunterHouseFilterableFields);
    const paginationOptions = (0, pick_1.default)(req === null || req === void 0 ? void 0 : req.query, Paginationconstants_1.paginationFields);
    const result = yield owner_service_1.HouseService.getAllHouses(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "House retrieved Successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getOwnedHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    console.log(email);
    if (!email) {
        return (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: "Email parameter is missing",
            data: null,
        });
    }
    try {
        const result = yield owner_service_1.HouseService.getOwnedHouse(email);
        console.log(result);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Owner's Houses retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            message: "An error occurred",
            data: null,
        });
    }
}));
const addHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, owner, address, city, bedrooms, bathrooms, room_size, picture, availability_date, rent_per_month, phone_number, description, email, label } = req.body;
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
    const result = yield owner_service_1.HouseService.createHouse(newHouse);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "House created successfully",
        data: result,
    });
}));
const updateHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield owner_service_1.HouseService.updateSingleHouse(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "House Updated Successfully",
        data: result,
    });
}));
const getSingleHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield owner_service_1.HouseService.getSingleHouse(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "House Retreived Successfully",
        data: result,
    });
}));
const deleteSingleHouse = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield owner_service_1.HouseService.deleteHouse(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "House Deleted Successfully",
        data: result,
    });
}));
exports.HouseController = {
    getAllHouses,
    getOwnedHouse,
    addHouse,
    updateHouse,
    deleteSingleHouse,
    getSingleHouse
};
