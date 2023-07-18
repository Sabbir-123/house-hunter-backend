import  { Schema, model } from "mongoose";
import { HouseModel, IHouse } from "./owner.interface";
import { Label } from "./Owner.constant";

const houseSchema = new Schema<IHouse, Record<string, never>>(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
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
            enum: Label,
            default: Label.ForRent,
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
				validator: function (value: string) {
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
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	},
);

export const House = model<IHouse, HouseModel>("house", houseSchema);
