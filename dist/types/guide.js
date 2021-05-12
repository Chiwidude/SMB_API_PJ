"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Guide = void 0;
/* eslint-disable @typescript-eslint/no-unsafe-return */
const mongoose_1 = __importDefault(require("mongoose"));
const guideSchema = new mongoose_1.default.Schema({
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
});
guideSchema.statics.build = (item) => {
    return new Guide(item);
};
const Guide = mongoose_1.default.model('Guide', guideSchema);
exports.Guide = Guide;
