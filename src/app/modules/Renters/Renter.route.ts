import express from "express";


import { RenterController } from "./Renter.controller";


const router = express.Router();

router.get("/bookings/:email", RenterController.getAllBookings);
router.post("/booking-house",

 RenterController.createBooking);


router.delete(
  "/bookingDelete/:id",

  RenterController.deleteSingleBooking
);


export const RenterRoutes = router;
