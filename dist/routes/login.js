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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const express_1 = require("express");
const jwt_1 = require("./_helpers/jwt");
const bcrypt_1 = require("bcrypt");
const user_1 = require("../types/user");
const constants_1 = require("@shared/constants");
const router = express_1.Router();
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT } = http_status_codes_1.default;
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    if (body === null) {
        return res.status(BAD_REQUEST).json({
            error: "no data was sent",
        });
    }
    const notUniqueEmail = yield user_1.User.findOne({ email: body.email });
    if (notUniqueEmail) {
        return res.status(BAD_REQUEST).json({ error: "Email is already registered" });
    }
    const newUser = user_1.User.build(body);
    const salt = yield bcrypt_1.genSalt(10);
    newUser.password = yield bcrypt_1.hash(newUser.password, salt);
    const user = yield newUser.save().catch(err => err);
    if (user === newUser) {
        return res.status(CREATED).end();
    }
    else {
        return res.status(BAD_REQUEST).json({
            error: constants_1.paramMissingError,
        });
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = yield user_1.User.findOne({ email: body.email }).exec();
    if (!user) {
        return res.status(NOT_FOUND).json({ error: "Invalid user or Password" });
    }
    const validPwd = yield bcrypt_1.compare(body.password, user.password);
    if (!validPwd)
        return res.status(BAD_REQUEST).json({ error: "Invalid user or Password" });
    const token = jwt_1.generateAToken({
        name: user.name,
        id: user._id
    });
    return res.status(OK).json({ token, username: user.username, id: user._id }).end();
}));
router.get("/authorize", jwt_1.authToken, (req, res) => {
    return res.status(OK).end();
});
router.get("/:id", jwt_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield user_1.User.findById(id).exec();
    if (user === null) {
        return res.status(NOT_FOUND).json({
            error: constants_1.notFoundItem,
        });
    }
    return res.status(OK).json({ user });
}));
router.put("/:id", jwt_1.authToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = req.body;
    const id = req.params.id;
    const updated = yield user_1.User.findByIdAndUpdate(id, updatedUser).exec();
    if (updated === null) {
        return res.status(NOT_FOUND).end();
    }
    else {
        res.status(NO_CONTENT).end();
    }
}));
exports.default = router;
