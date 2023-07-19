import express from "express";
import { HouseController } from "./owner.controller";
import validateRequest from "../../middlwares/validateRequest";
import { OwnerValidation } from "./owner.validation";

const router = express.Router();

router.get("/houses", HouseController.getAllHouses);
router.post("/ownedHouses",
validateRequest(OwnerValidation?.CreateHouseZodSchema),
 HouseController.addHouse);

router.patch(
  "/ownedSingleHouse/:id",

  validateRequest(OwnerValidation?.UpdateHouseZodSchema),
  HouseController.updateHouse
);
router.delete(
  "/ownedSingleHouse/:id",

  HouseController.deleteSingleHouse
);
router.get(
  "/ownedHouse/:email",

  HouseController.getOwnedHouse
);
router.get(
  "/signleHouse/:id",

  HouseController.getSingleHouse
);

export const OwnerRoutes = router;
