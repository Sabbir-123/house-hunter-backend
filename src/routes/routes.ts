import express from "express";
import { UserRoutes } from "../app/modules/users/user.route";
import { OwnerRoutes } from "../app/modules/HouseOwner/owner.route";

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
  
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
