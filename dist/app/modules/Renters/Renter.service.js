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
exports.BookingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const owner_model_1 = require("../HouseOwner/owner.model");
const Renter_model_1 = require("./Renter.model");
const mongoose_1 = __importDefault(require("mongoose"));
const Owner_constant_1 = require("../HouseOwner/Owner.constant");
const user_model_1 = require("../users/user.model");
const user_interface_1 = require("../users/user.interface");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { house, email, phone_number } = payload;
    const existingHouse = yield owner_model_1.House.findById(house);
    if (!existingHouse) {
        throw new ApiError_1.default("Invalid House reference ID", http_status_1.default.BAD_REQUEST);
    }
    const existingOrder = yield Renter_model_1.Booking.findOne(payload);
    if (existingOrder) {
        throw new ApiError_1.default("Already Booked this House", http_status_1.default.BAD_REQUEST);
    }
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.default("Invalid User ID", http_status_1.default.BAD_REQUEST);
    }
    console.log("hi", user);
    if (user.role === user_interface_1.ROLE_BASED.OWNER) {
        throw new ApiError_1.default("Owners cannot create orders", http_status_1.default.BAD_REQUEST);
    }
    const renterBookings = yield Renter_model_1.Booking.find({ phone_number: phone_number });
    if (renterBookings.length >= 2) {
        throw new ApiError_1.default("You have already booked two houses. Please free up space for new bookings.", http_status_1.default.BAD_REQUEST);
    }
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        existingHouse.label = Owner_constant_1.Label.Rented;
        yield existingHouse.save();
        // Create the order
        const createdOrder = yield Renter_model_1.Booking.create(payload);
        yield session.commitTransaction();
        session.endSession();
        return createdOrder;
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const getAllBookings = (userPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield user_model_1.User.findOne({ userPhoneNumber }).exec(); // Assuming you have a Buyer model
    if (!buyer) {
        throw new Error("Renter not found");
    }
    const orders = yield Renter_model_1.Booking.find({
        userPhoneNumber
    });
    return orders;
});
const deleteBooking = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Renter_model_1.Booking.findOneAndDelete({ _id: id, email });
    return result;
});
exports.BookingService = {
    createOrder,
    getAllBookings,
    deleteBooking
};
