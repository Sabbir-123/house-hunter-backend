import express from "express";
import { HouseController } from "./owner.controller";

const router = express.Router();

router.get("/houses", HouseController.getAllHouses);
router.post("/ownedHouses", HouseController.addHouse);
// router.get("/users/my-profile", UserController.myProfile);
// router.patch(
//   "/users/:id",

//   validateRequest(UserValidation?.updateCowHutUserZodSchema),
//   UserController.updateUser
// );
// router.delete(
//   "/users/:id",

//   UserController.deleteSingleUser
// );
router.get(
  "/ownedHouse/:id",

  HouseController.getOwnedHouse
);

export const OwnerRoutes = router;
