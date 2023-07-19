"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const bookingSchema = new mongoose_2.Schema({
    house: {
        type: mongoose_2.Schema.Types.ObjectId,
        ref: "house",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // Regular expression for Bangladeshi phone numbers
                const bdPhoneNumberRegex = /^(\+?880|0)[1][3-9]\d{8}$/;
                return bdPhoneNumberRegex.test(value);
            },
            message: "Invalid Bangladeshi phone number",
        },
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Booking = (0, mongoose_1.model)("booking", bookingSchema);
