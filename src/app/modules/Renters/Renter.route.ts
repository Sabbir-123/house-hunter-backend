import express from "express";


import { RenterController } from "./Renter.controller";


const router = express.Router();

// router.get("/houses", RenterController.getAllHouses);
router.post("/booking-house",

 RenterController.createBooking);

// router.patch(
//   "/ownedSingleHouse/:id",

 
//   RenterController.updateHouse
// );
// router.delete(
//   "/ownedSingleHouse/:id",

//   RenterController.deleteSingleHouse
// );
// router.get(
//   "/ownedHouse/:id",

//   RenterController.getOwnedHouse
// );

export const RenterRoutes = router;
