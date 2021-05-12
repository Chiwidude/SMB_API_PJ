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
exports.updateBuild = exports.deleteBuild = exports.createBuild = exports.getBuildWId = exports.getBuilds = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const BuildsDB_1 = __importDefault(require("../_helpers/BuildsDB"));
const redis_1 = __importDefault(require("../../shared/redis"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = http_status_codes_1.default;
const getBuilds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.query;
        if (user.user === undefined) {
            redis_1.default.get("allBuilds", (err, reply) => __awaiter(void 0, void 0, void 0, function* () {
                if (reply) {
                    const builds = JSON.parse(reply);
                    return res.status(OK).json({ builds });
                }
                else {
                    const builds = yield BuildsDB_1.default.getBuilds(user);
                    setTimeout(() => {
                        console.log("data from db");
                        redis_1.default.set("allBuilds", JSON.stringify(builds));
                        return res.status(OK).json({ builds });
                    }, 3000);
                }
            }));
        }
        else { //when user comes in url query
            const usr = typeof user.user !== 'string' ? "" : user.user;
            if (usr === user.user) {
                const builds = yield BuildsDB_1.default.getBuilds(user);
                console.log("data from db");
                redis_1.default.set("builds " + usr, JSON.stringify(builds));
                return res.status(OK).json({ builds });
            }
        }
    }
    catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.getBuilds = getBuilds;
const getBuildWId = (req, res) => {
    try {
        const id = req.params.id;
        redis_1.default.get("build " + id, (err, reply) => __awaiter(void 0, void 0, void 0, function* () {
            if (reply) {
                const build = JSON.parse(reply);
                return res.status(OK).json({ build });
            }
            else {
                const build = yield BuildsDB_1.default.getBuildWId(id);
                if (!build) {
                    return res.status(NOT_FOUND).json({
                        error: "There's not such item in our database",
                    });
                }
                setTimeout(() => {
                    console.log("data from db");
                    redis_1.default.set("build " + id, JSON.stringify(build));
                    return res.status(OK).json({ build });
                }, 3000);
            }
        }));
    }
    catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};
exports.getBuildWId = getBuildWId;
const createBuild = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const build = req.body;
        redis_1.default.del("allBuilds");
        yield BuildsDB_1.default.createBuild(build);
        return res.status(CREATED).end();
    }
    catch (err) {
        return res.status(BAD_REQUEST).json({
            error: 'One or more of the required parameters was missing.',
        });
    }
});
exports.createBuild = createBuild;
const deleteBuild = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        redis_1.default.del("allBuilds");
        const id = req.params.id;
        const deleted = yield BuildsDB_1.default.deleteBuild(id);
        if (deleted === null) {
            return res.status(NOT_FOUND).end();
        }
        return res.status(NO_CONTENT).end();
    }
    catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.deleteBuild = deleteBuild;
const updateBuild = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        redis_1.default.del("allBuilds");
        const updatedBuild = req.body;
        const id = req.params.id;
        const updated = yield BuildsDB_1.default.updateBuild(id, updatedBuild);
        if (updated === null) {
            return res.status(NOT_FOUND).end();
        }
        return res.status(NO_CONTENT).end();
    }
    catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.updateBuild = updateBuild;
