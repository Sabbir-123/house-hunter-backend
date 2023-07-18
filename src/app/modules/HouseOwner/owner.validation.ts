import { z } from "zod";

const CreateHouseZodSchema = z.object({
  body: z.object({
    owner: z.string().optional(),
    name: z.string({
      required_error: "Name is required",
    }),
    address: z.string({
      required_error: "Address is required",
    }),
    city: z.string({
      required_error: "City is required",
    }),
    bedrooms: z.number({
      required_error: "Number of bedrooms is required",
    }),
    bathrooms: z.number({
      required_error: "Number of bathrooms is required",
    }),
    room_size: z.number({
      required_error: "Room size is required",
    }),
    picture: z.string({
      required_error: "Picture URL is required",
    }),
    availability_date: z.string({
      required_error: "Availability date is required",
    }),
    rent_per_month: z.number({
      required_error: "Rent per month is required",
    }),
    phone_number: z.string().regex(/^(\+?880|0)[1][3-9]\d{8}$/, {
      message: "Invalid Bangladeshi phone number",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
  }),
});

const UpdateHouseZodSchema = z.object({
  body: z.object({
    owner: z.string().optional(),
    name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    bedrooms: z.number().optional(),
    bathrooms: z.number().optional(),
    room_size: z.number().optional(),
    picture: z.string().optional(),
    availability_date: z.string().optional(),
    rent_per_month: z.number().optional(),
    phone_number: z.string()
      .regex(/^(\+?880|0)[1][3-9]\d{8}$/, {
        message: "Invalid Bangladeshi phone number",
      })
      .optional(),
    description: z.string().optional(),
  }),
});


export const OwnerValidation = {
    CreateHouseZodSchema,
    UpdateHouseZodSchema,
  };
  