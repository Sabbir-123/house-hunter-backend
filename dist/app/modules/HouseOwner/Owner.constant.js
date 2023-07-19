"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Label = exports.HouseHunterHouseFilterableFields = exports.HouseHunterHouseSearchableFields = void 0;
exports.HouseHunterHouseSearchableFields = [
    "city",
    "bedrooms",
    "bathrooms",
    "room_size",
    "availability_date",
    "rent_per_month"
];
exports.HouseHunterHouseFilterableFields = [
    "searchTerm",
    "city",
    "bedrooms",
    "bathrooms",
    "room_size",
    "availability_date",
    "rent_per_month"
];
var Label;
(function (Label) {
    Label["ForRent"] = "for rent";
    Label["Rented"] = "rented";
})(Label || (exports.Label = Label = {}));
