import express from "express";
import { UserRoutes } from "../app/modules/users/user.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/v1/",
    route: UserRoutes,
  },
  
];
moduleRoute.forEach((route) => {
  router.use(route?.path, route?.route);
});

export default router;
