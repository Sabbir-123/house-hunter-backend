"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenterRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Renter_controller_1 = require("./Renter.controller");
const router = express_1.default.Router();
router.get("/bookings/:number", Renter_controller_1.RenterController.getAllBookings);
router.post("/booking-house", Renter_controller_1.RenterController.createBooking);
router.delete("/bookingDelete/:id", Renter_controller_1.RenterController.deleteSingleBooking);
exports.RenterRoutes = router;
