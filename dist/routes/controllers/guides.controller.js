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
exports.updateGuide = exports.deleteGuide = exports.createGuide = exports.getGuideWId = exports.getGuides = void 0;
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-misused-promises */
const GuidesDB_1 = __importDefault(require("../_helpers/GuidesDB"));
const redis_1 = __importDefault(require("../../shared/redis"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const { BAD_REQUEST, CREATED, OK, NOT_FOUND, NO_CONTENT, INTERNAL_SERVER_ERROR } = http_status_codes_1.default;
const getGuides = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.query;
        if (user.user === undefined) {
            redis_1.default.get("allGuides", (err, reply) => __awaiter(void 0, void 0, void 0, function* () {
                if (reply) {
                    const guides = JSON.parse(reply);
                    return res.status(OK).json({ guides });
                }
                else {
                    const guides = yield GuidesDB_1.default.getGuides(user);
                    setTimeout(() => {
                        console.log("data from db");
                        redis_1.default.set("allGuides", JSON.stringify(guides));
                        return res.status(OK).json({ guides });
                    }, 3000);
                }
            }));
        }
        else { //when user comes in url query
            const usr = typeof user.user !== 'string' ? "" : user.user;
            if (usr === user.user) {
                const guides = yield GuidesDB_1.default.getGuides(user);
                redis_1.default.set("guides " + usr, JSON.stringify(guides));
                return res.status(OK).json({ guides });
            }
        }
    }
    catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.getGuides = getGuides;
const getGuideWId = (req, res) => {
    try {
        const id = req.params.id;
        redis_1.default.get("guide " + id, (err, reply) => __awaiter(void 0, void 0, void 0, function* () {
            if (reply) {
                const guide = JSON.parse(reply);
                return res.status(OK).json({ guide });
            }
            else {
                const guide = yield GuidesDB_1.default.getGuideWId(id);
                if (!guide) {
                    return res.status(NOT_FOUND).json({
                        error: "There's not such item in our database",
                    });
                }
                setTimeout(() => {
                    console.log("data from db");
                    redis_1.default.set("guide " + id, JSON.stringify(guide));
                    return res.status(OK).json({ guide });
                }, 3000);
            }
        }));
    }
    catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
};
exports.getGuideWId = getGuideWId;
const createGuide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guide = req.body;
        redis_1.default.del("allGuides");
        yield GuidesDB_1.default.createGuide(guide);
        return res.status(CREATED).end();
    }
    catch (err) {
        return res.status(BAD_REQUEST).json({
            error: 'One or more of the required parameters was missing.',
        });
    }
});
exports.createGuide = createGuide;
const deleteGuide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        redis_1.default.del("allGuides");
        const id = req.params.id;
        const deleted = yield GuidesDB_1.default.deleteGuide(id);
        if (deleted === null) {
            return res.status(NOT_FOUND).end();
        }
        return res.status(NO_CONTENT).end();
    }
    catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.deleteGuide = deleteGuide;
const updateGuide = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        redis_1.default.del("allGuides");
        const updatedGuide = req.body;
        const id = req.params.id;
        const updated = yield GuidesDB_1.default.updateGuide(id, updatedGuide);
        if (updated === null) {
            return res.status(NOT_FOUND).end();
        }
        return res.status(NO_CONTENT).end();
    }
    catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
    }
});
exports.updateGuide = updateGuide;
