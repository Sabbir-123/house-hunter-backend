"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const user_constant_1 = require("./user.constant");
const user_model_1 = require("./user.model");
const user_util_1 = require("./user.util");
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // auto generated incremental id
    const id = yield (0, user_util_1.generateUseId)(user.role);
    user.id = id;
    const createdUser = yield user_model_1.User.create(user);
    if (!createdUser) {
        throw new ApiError_1.default("Failed to create User", 400);
    }
    return createdUser;
});
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    //filtering and searching
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    // dynamically searching
    if (searchTerm) {
        andCondition.push({
            $or: user_constant_1.HouseHunterSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    // dynamically filtering
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield user_model_1.User.find(whereCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// single user
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOneAndDelete({ _id: id });
    return result;
});
//login
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //check user exist
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default("User not found", http_status_1.default.NOT_FOUND);
    }
    //match password
    if (isUserExist.password &&
        !(yield user.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default("Password is incorrect", http_status_1.default.UNAUTHORIZED);
    }
    const { phoneNumber: userPhoneNumber, role, email: userEmail } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userPhoneNumber, role, userEmail }, index_1.default.jwt.secret, index_1.default.jwt.access_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ userPhoneNumber, role, userEmail }, index_1.default.jwt.refresh_secret, index_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
//refresh token
const refreshTokenService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    //verify token
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, index_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default("Invalid Refresh Token", http_status_1.default.FORBIDDEN);
    }
    //check user exist
    const { userEmail } = verifiedToken;
    const user = new user_model_1.User();
    const isUserExist = yield user.isUserExist(userEmail);
    if (!isUserExist) {
        throw new ApiError_1.default("user not found", http_status_1.default.NOT_FOUND);
    }
    //create new access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist.id, role: isUserExist.role }, index_1.default.jwt.secret, index_1.default.jwt.access_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const myProfile = (accessToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (accessToken) {
        const decodedToken = jwtHelpers_1.jwtHelpers.decodeToken(accessToken);
        const { userPhoneNumber } = decodedToken;
        const user = yield user_model_1.User.findOne({ phoneNumber: userPhoneNumber })
            .select("name phoneNumber address")
            .lean();
        if (!user) {
            throw new ApiError_1.default("User not found", http_status_1.default.NOT_FOUND);
        }
        return user;
    }
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    loginUser,
    refreshTokenService,
    myProfile,
};
