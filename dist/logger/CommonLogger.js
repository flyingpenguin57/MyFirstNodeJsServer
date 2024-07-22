"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const homeDir = os_1.default.homedir();
// 创建一个 logger 实例
const apiLogger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.File({
            filename: path_1.default.join(homeDir, 'logs', 'api.log'), // 指定日志文件目录
            maxsize: 5242880, // 5MB
            maxFiles: 5, // 保留最近5个日志文件
            tailable: true
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        })
    ]
});
exports.default = apiLogger;
