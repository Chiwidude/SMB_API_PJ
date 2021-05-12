"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const jwt_1 = require("./_helpers/jwt");
const router = express_1.Router();
const builds_controller_1 = require("./controllers/builds.controller");
router.get("/", builds_controller_1.getBuilds);
router.get("/:id", builds_controller_1.getBuildWId);
router.post("/create", jwt_1.authToken, builds_controller_1.createBuild);
router.delete("/delete/:id", jwt_1.authToken, builds_controller_1.deleteBuild);
router.put("/:id", jwt_1.authToken, builds_controller_1.updateBuild);
exports.default = router;
