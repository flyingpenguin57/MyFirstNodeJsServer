"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CommonLogger_1 = __importDefault(require("../logger/CommonLogger"));
const requestLog = (req, res, next) => {
    const requestPath = req.path;
    const requestBody = req.body;
    CommonLogger_1.default.info(`Request start, path: ${requestPath}, param: ${JSON.stringify(requestBody)}`);
    next();
};
exports.default = requestLog;
