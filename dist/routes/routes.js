"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../app/modules/users/user.route");
const owner_route_1 = require("../app/modules/HouseOwner/owner.route");
const Renter_route_1 = require("../app/modules/Renters/Renter.route");
const router = express_1.default.Router();
const moduleRoute = [
    {
        path: "/v1/",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/v1/owners/",
        route: owner_route_1.OwnerRoutes,
    },
    {
        path: "/v1/renters/",
        route: Renter_route_1.RenterRoutes,
    }
];
moduleRoute.forEach((route) => {
    router.use(route === null || route === void 0 ? void 0 : route.path, route === null || route === void 0 ? void 0 : route.route);
});
exports.default = router;
