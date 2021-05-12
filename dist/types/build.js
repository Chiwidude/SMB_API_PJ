"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Build = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-return */
const mongoose_1 = __importDefault(require("mongoose"));
const opts = { toJSON: { getters: true, virtuals: false } };
const buildSchema = new mongoose_1.default.Schema({
    rating: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    gods: {
        type: []
    },
    roles: {
        type: []
    },
    user: {
        type: String
    },
    date: {
        type: String
    }
}, opts);
buildSchema.statics.build = (item) => {
    return new Build(item);
};
const Build = mongoose_1.default.model('Build', buildSchema);
exports.Build = Build;
