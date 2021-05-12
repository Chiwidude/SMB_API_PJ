"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authToken = exports.generateAToken = void 0;
/* eslint-disable max-len */
const jsonwebtoken_1 = require("jsonwebtoken");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { FORBIDDEN } = http_status_codes_1.default;
const generateAToken = (username) => jsonwebtoken_1.sign(username, process.env.keywrd, { expiresIn: '1d' });
exports.generateAToken = generateAToken;
const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if (typeof (token) === 'undefined')
        return res.status(FORBIDDEN).json({ "err": "no token" });
    jsonwebtoken_1.verify(token, process.env.keywrd, (err, data) => {
        if (err)
            return res.status(FORBIDDEN).json({ "err": "could not validate token",
                "token": token });
        delete data["iat"];
        delete data["exp"];
        const newtoken = exports.generateAToken(data);
        res.setHeader('authorization', newtoken);
        next();
    });
};
exports.authToken = authToken;
