import { z } from "zod";

const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: "Role is required",
      }),
      password: z.string({
        required_error: "Password is required",
      }),
      name: z.string({
        required_error: "First name is required",
      }),
      phoneNumber: z.string({
        required_error: "Phone number is required",
      }),
      email: z.string({
        required_error: "Email is required",
      }),
    }),
  }),
});

const updateCowHutUserZodSchema = z.object({
  body: z.object({
    role: z
      .string({
        required_error: "Role is required",
      })
      .optional(),
    password: z.string().optional(),
    name: z
    .string({
      required_error: "Full Name is required",
    })
    .optional(),
    phoneNumber: z
      .string({
        required_error: "Phone number is required",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email is required",
      })
      .optional()
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh Token is required",
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateCowHutUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
