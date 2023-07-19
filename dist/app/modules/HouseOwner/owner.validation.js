"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerValidation = void 0;
const zod_1 = require("zod");
const CreateHouseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        owner: zod_1.z.string().optional(),
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
        city: zod_1.z.string({
            required_error: "City is required",
        }),
        bedrooms: zod_1.z.number({
            required_error: "Number of bedrooms is required",
        }),
        bathrooms: zod_1.z.number({
            required_error: "Number of bathrooms is required",
        }),
        room_size: zod_1.z.number({
            required_error: "Room size is required",
        }),
        picture: zod_1.z.string({
            required_error: "Picture URL is required",
        }),
        availability_date: zod_1.z.string({
            required_error: "Availability date is required",
        }),
        rent_per_month: zod_1.z.number({
            required_error: "Rent per month is required",
        }),
        phone_number: zod_1.z.string().regex(/^(\+?880|0)[1][3-9]\d{8}$/, {
            message: "Invalid Bangladeshi phone number",
        }),
        description: zod_1.z.string({
            required_error: "Description is required",
        }),
    }),
});
const UpdateHouseZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        owner: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        bedrooms: zod_1.z.number().optional(),
        bathrooms: zod_1.z.number().optional(),
        room_size: zod_1.z.number().optional(),
        picture: zod_1.z.string().optional(),
        availability_date: zod_1.z.string().optional(),
        rent_per_month: zod_1.z.number().optional(),
        phone_number: zod_1.z.string()
            .regex(/^(\+?880|0)[1][3-9]\d{8}$/, {
            message: "Invalid Bangladeshi phone number",
        })
            .optional(),
        description: zod_1.z.string().optional(),
    }),
});
exports.OwnerValidation = {
    CreateHouseZodSchema,
    UpdateHouseZodSchema,
};
