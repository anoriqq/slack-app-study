"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app_1 = require("../app");
var router = express_1.default.Router();
exports.router = router;
router.use('/', app_1.root);
router.use('/slack', app_1.slack);
router.use('/health', app_1.health);
