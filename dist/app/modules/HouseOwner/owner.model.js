"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
const mongoose_1 = require("mongoose");
const Owner_constant_1 = require("./Owner.constant");
const houseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: Owner_constant_1.Label,
        default: Owner_constant_1.Label.ForRent,
    },
    room_size: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    availability_date: {
        type: Date,
        required: true,
    },
    rent_per_month: {
        type: Number,
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
    },
    description: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.House = (0, mongoose_1.model)("house", houseSchema);
