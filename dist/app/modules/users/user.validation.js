"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        user: zod_1.z.object({
            role: zod_1.z.string({
                required_error: "Role is required",
            }),
            password: zod_1.z.string({
                required_error: "Password is required",
            }),
            name: zod_1.z.string({
                required_error: "First name is required",
            }),
            phoneNumber: zod_1.z.string({
                required_error: "Phone number is required",
            }),
            email: zod_1.z.string({
                required_error: "Email is required",
            }),
        }),
    }),
});
const updateCowHutUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z
            .string({
            required_error: "Role is required",
        })
            .optional(),
        password: zod_1.z.string().optional(),
        name: zod_1.z
            .string({
            required_error: "Full Name is required",
        })
            .optional(),
        phoneNumber: zod_1.z
            .string({
            required_error: "Phone number is required",
        })
            .optional(),
        email: zod_1.z
            .string({
            required_error: "Email is required",
        })
            .optional()
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: "email is required",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "Refresh Token is required",
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateCowHutUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
