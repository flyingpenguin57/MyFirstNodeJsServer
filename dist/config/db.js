"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// db.ts
const mysql2_1 = __importDefault(require("mysql2"));
// 创建一个连接池
const pool = mysql2_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'MyDataBase',
    waitForConnections: true,
    connectionLimit: 10, // 最大连接数
    queueLimit: 0 // 队列大小（0表示没有限制）
});
exports.default = pool.promise(); // 使用 promise API
