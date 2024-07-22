"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const UserInfoHolder_1 = __importDefault(require("./threadlocal/UserInfoHolder"));
const crypto = require('crypto');
const publicKey = (0, fs_1.readFileSync)((0, path_1.join)('./src/crypto', 'publicKey.pem'), 'utf8');
const VerifyToken = (req, res, next) => {
    var _a, _b;
    // 从组合字符串中解析出原始数据
    const token = req.headers['token'];
    if (token === undefined || typeof token !== 'string') {
        throw new Error("invalid token.");
    }
    const parsedArray = token.split('|');
    const loginEmail = parsedArray[0];
    const expireTime = parseInt(parsedArray[1], 10);
    const signature = parsedArray[2];
    const dataArray = [loginEmail, expireTime];
    const dataString = dataArray.join('|');
    //验签
    const verify = crypto.createVerify('SHA256');
    verify.update(dataString);
    verify.end();
    const isVerified = verify.verify(publicKey, signature, 'base64');
    if (isVerified) {
        if (expireTime <= Date.now()) {
            throw new Error("token expired.");
        }
        //todo:把email塞到上下文
        (_a = UserInfoHolder_1.default.getStore()) === null || _a === void 0 ? void 0 : _a.set("loginEmail", loginEmail);
        console.log((_b = UserInfoHolder_1.default.getStore()) === null || _b === void 0 ? void 0 : _b.get("loginEmail"));
        console.log(`verify token success, email = ${loginEmail}`);
        next();
    }
    else {
        throw new Error("invalid token.");
    }
};
exports.default = VerifyToken;
