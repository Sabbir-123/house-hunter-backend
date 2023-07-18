import express from "express";
import { UserRoutes } from "../app/modules/users/user.route";
import { OwnerRoutes } from "../app/modules/HouseOwner/owner.route";
import { RenterRoutes } from "../app/modules/Renters/Renter.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/v1/",
    route: UserRoutes,
  },
  {
    path: "/v1/owners/",
    route: OwnerRoutes,
  },
  {
    path: "/v1/renters/",
    route: RenterRoutes,
  }
  
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
