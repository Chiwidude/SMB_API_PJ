"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const guides_controller_1 = require("./controllers/guides.controller");
const jwt_1 = require("./_helpers/jwt");
const router = express_1.Router();
router.get("/", guides_controller_1.getGuides);
router.get("/:id", guides_controller_1.getGuideWId);
router.post("/create", jwt_1.authToken, guides_controller_1.createGuide);
router.delete("/delete/:id", jwt_1.authToken, guides_controller_1.deleteGuide);
router.put("/:id", jwt_1.authToken, guides_controller_1.updateGuide);
exports.default = router;
