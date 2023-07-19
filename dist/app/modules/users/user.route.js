"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlwares/validateRequest"));
const router = express_1.default.Router();
router.post("/auth/signup", (0, validateRequest_1.default)(user_validation_1.UserValidation === null || user_validation_1.UserValidation === void 0 ? void 0 : user_validation_1.UserValidation.createUserZodSchema), user_controller_1.UserController.creatrUser);
//login
router.post("/auth/login", (0, validateRequest_1.default)(user_validation_1.UserValidation.loginZodSchema), user_controller_1.UserController.loginUser);
//refreshToken
router.post("/auth/refresh-token", (0, validateRequest_1.default)(user_validation_1.UserValidation.refreshTokenZodSchema), user_controller_1.UserController.refreshToken);
router.get("/users", user_controller_1.UserController.getAllUsers);
router.get("/users/my-profile", user_controller_1.UserController.myProfile);
router.patch("/users/:id", (0, validateRequest_1.default)(user_validation_1.UserValidation === null || user_validation_1.UserValidation === void 0 ? void 0 : user_validation_1.UserValidation.updateCowHutUserZodSchema), user_controller_1.UserController.updateUser);
router.delete("/users/:id", user_controller_1.UserController.deleteSingleUser);
router.get("/users/:id", user_controller_1.UserController.getSingleUser);
exports.UserRoutes = router;
