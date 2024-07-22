"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const on_finished_1 = __importDefault(require("on-finished"));
const CommonLogger_1 = __importDefault(require("../logger/CommonLogger"));
const resultLog = (req, res, next) => {
    let oldSend = res.send;
    let responseBody;
    res.send = function (body) {
        responseBody = body;
        return oldSend.apply(res, arguments);
    };
    (0, on_finished_1.default)(res, (err, res) => {
        CommonLogger_1.default.info(`Response body: ${JSON.stringify(responseBody)}`);
    });
    next();
};
exports.default = resultLog;
