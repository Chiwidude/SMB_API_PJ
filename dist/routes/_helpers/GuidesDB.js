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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const guide_1 = require("../../types/guide");
const getGuides = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Guides = yield guide_1.Guide.find(user);
        return Guides;
    }
    catch (err) {
        return err;
    }
});
const getGuideWId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guide = yield guide_1.Guide.findById(id).exec();
        return guide;
    }
    catch (err) {
        return err;
    }
});
const createGuide = (nGuide) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGuide = guide_1.Guide.build(nGuide);
        const created = yield newGuide.save();
        return created;
    }
    catch (err) {
        return err;
    }
});
const deleteGuide = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield guide_1.Guide.findByIdAndDelete(id).exec();
        return deleted;
    }
    catch (err) {
        return err;
    }
});
const updateGuide = (id, guide) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield guide_1.Guide.findByIdAndUpdate(id, guide).exec();
        return updated;
    }
    catch (err) {
        return err;
    }
});
const dbGuides = {
    getGuides,
    getGuideWId,
    createGuide,
    deleteGuide,
    updateGuide
};
exports.default = dbGuides;
