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
/* eslint-disable @typescript-eslint/no-unsafe-return */
const build_1 = require("../../types/build");
const getBuilds = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const builds = yield build_1.Build.find(user);
        return builds;
    }
    catch (err) {
        return err;
    }
});
const getBuildWId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const build = yield build_1.Build.findById(id).exec();
        return build;
    }
    catch (err) {
        return err;
    }
});
const createBuild = (nbuild) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBuild = build_1.Build.build(nbuild);
        const created = yield newBuild.save();
        return created;
    }
    catch (err) {
        return err;
    }
});
const deleteBuild = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield build_1.Build.findByIdAndDelete(id).exec();
        return deleted;
    }
    catch (err) {
        return err;
    }
});
const updateBuild = (id, build) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield build_1.Build.findByIdAndUpdate(id, build).exec();
        return updated;
    }
    catch (err) {
        return err;
    }
});
const dbBuilds = {
    getBuilds,
    getBuildWId,
    createBuild,
    deleteBuild,
    updateBuild
};
exports.default = dbBuilds;
