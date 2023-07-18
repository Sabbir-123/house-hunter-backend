import { model } from "mongoose";
import { BookingModel, IBookings } from "./Renter.interface";
import { Schema } from "mongoose";


const bookingSchema = new Schema<IBookings, Record<string, never>>(
	{
		house: {
			type: Schema.Types.ObjectId,
			
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
				validator: function (value: string) {
					// Regular expression for Bangladeshi phone numbers
					const bdPhoneNumberRegex = /^(\+?880|0)[1][3-9]\d{8}$/;
					return bdPhoneNumberRegex.test(value);
				},
				message: "Invalid Bangladeshi phone number",
			},
		}
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	},
);

export const Booking = model<IBookings, BookingModel>("booking", bookingSchema);