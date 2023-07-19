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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const owner_model_1 = require("./owner.model");
const Owner_constant_1 = require("./Owner.constant");
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const getAllHouses = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    // Dynamically searching
    if (searchTerm) {
        andCondition.push({
            $or: Owner_constant_1.HouseHunterHouseSearchableFields.map((field) => ({
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
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield owner_model_1.House.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield owner_model_1.House.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getOwnedHouse = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const houses = yield owner_model_1.House.find({ email: email });
    return houses;
});
const createHouse = (NewHouse) => __awaiter(void 0, void 0, void 0, function* () {
    const createdHouse = yield owner_model_1.House.create(NewHouse);
    if (!createdHouse) {
        throw new ApiError_1.default("Failed to create House", 400);
    }
    return createdHouse;
});
const updateSingleHouse = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield owner_model_1.House.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const getSingleHouse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield owner_model_1.House.findOne({ _id: id });
    return result;
});
const deleteHouse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield owner_model_1.House.findOneAndDelete({ _id: id });
    return result;
});
exports.HouseService = {
    updateSingleHouse,
    getAllHouses,
    getOwnedHouse,
    createHouse,
    deleteHouse,
    getSingleHouse
};
