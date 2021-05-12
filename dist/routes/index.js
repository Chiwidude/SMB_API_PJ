"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Builds_1 = __importDefault(require("./Builds"));
const Guides_1 = __importDefault(require("./Guides"));
const login_1 = __importDefault(require("./login"));
// Init router and path
const router = express_1.Router();
// Add sub-routes
router.use('/builds', Builds_1.default);
router.use('/guides', Guides_1.default);
router.use('/users', login_1.default);
// Export the base-router
exports.default = router;
