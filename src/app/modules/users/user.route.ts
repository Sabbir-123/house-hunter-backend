import express from "express";

import { UserController } from "./user.controller";
import { UserValidation } from "./user.validation";
import validateRequest from "../../middlwares/validateRequest";

const router = express.Router();

router.post(
  "/auth/signup",
  validateRequest(UserValidation?.createUserZodSchema),
  UserController.creatrUser
);
//login
router.post(
  "/auth/login",
  validateRequest(UserValidation.loginZodSchema),
  UserController.loginUser
);
//refreshToken
router.post(
  "/auth/refresh-token",
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
);

router.get("/email/:email",  UserController.isOwner);


export const UserRoutes = router;
