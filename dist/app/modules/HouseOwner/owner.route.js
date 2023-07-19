"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OwnerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const owner_controller_1 = require("./owner.controller");
const validateRequest_1 = __importDefault(require("../../middlwares/validateRequest"));
const owner_validation_1 = require("./owner.validation");
const router = express_1.default.Router();
router.get("/houses", owner_controller_1.HouseController.getAllHouses);
router.post("/ownedHouses", (0, validateRequest_1.default)(owner_validation_1.OwnerValidation === null || owner_validation_1.OwnerValidation === void 0 ? void 0 : owner_validation_1.OwnerValidation.CreateHouseZodSchema), owner_controller_1.HouseController.addHouse);
router.patch("/ownedSingleHouse/:id", (0, validateRequest_1.default)(owner_validation_1.OwnerValidation === null || owner_validation_1.OwnerValidation === void 0 ? void 0 : owner_validation_1.OwnerValidation.UpdateHouseZodSchema), owner_controller_1.HouseController.updateHouse);
router.delete("/ownedSingleHouse/:id", owner_controller_1.HouseController.deleteSingleHouse);
router.get("/ownedHouse/:id", owner_controller_1.HouseController.getOwnedHouse);
router.get("/signleHouse/:id", owner_controller_1.HouseController.getSingleHouse);
exports.OwnerRoutes = router;
