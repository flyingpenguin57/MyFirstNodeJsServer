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
exports.createNewUser = createNewUser;
exports.loginS = loginS;
exports.getUserInfoS = getUserInfoS;
const crypto_1 = require("crypto");
const user_dao_1 = require("../dao/user-dao");
const fs_1 = require("fs");
const path_1 = require("path");
const UserInfoHolder_1 = __importDefault(require("../middleware/threadlocal/UserInfoHolder"));
const { keccak256 } = require('js-sha3');
const crypto = require('crypto');
const privateKey = (0, fs_1.readFileSync)((0, path_1.join)('./src/crypto', 'privateKey.pem'), 'utf8');
function createNewUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const users1 = yield (0, user_dao_1.queryUserByEmail)(user.email);
        const users2 = yield (0, user_dao_1.queryUserByUserName)(user.username);
        if (users1.length > 0 || users2.length > 0) {
            throw new Error("username or email already exist.");
        }
        //加密
        //const data = "Hello, this is a secret message!"; 原始数据
        //const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data)); 公钥加密
        //const base64EncryptedData = encryptedData.toString('base64'); 加密结果转成base64字符串
        //解密密码
        //从base64字符串中恢复加密内容
        const encryptedDataBuffer = Buffer.from(user.password, 'base64');
        //私钥解密
        const decryptedData = (0, crypto_1.privateDecrypt)(privateKey, encryptedDataBuffer);
        //把解密后的数据hash,写入db
        const encryptedPassword = keccak256(decryptedData);
        const newUser = {
            username: user.username,
            email: user.email,
            password: encryptedPassword,
            phone: user.phone,
        };
        yield (0, user_dao_1.insertUser)(newUser);
    });
}
function loginS(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield (0, user_dao_1.queryUserByEmail)(user.email);
        if (users.length <= 0) {
            throw new Error("user not exist.");
        }
        //加密
        //const data = "Hello, this is a secret message!"; 原始数据
        //const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data)); 公钥加密
        //const base64EncryptedData = encryptedData.toString('base64'); 加密结果转成base64字符串
        //解密密码
        //从base64字符串中恢复加密内容
        const encryptedDataBuffer = Buffer.from(user.password, 'base64');
        //私钥解密
        const decryptedData = (0, crypto_1.privateDecrypt)(privateKey, encryptedDataBuffer);
        //把解密后的数据hash,写入db
        const encryptedPassword = keccak256(decryptedData);
        if (encryptedPassword.toString() === users[0].password) {
            console.log(`login success, email = ${user.email}`);
            //generate token
            const dataArray = [user.email, Date.now() + 2 * 60 * 1000];
            const dataString = dataArray.join('|'); // 使用 '|' 作为分隔符，可以根据需要修改
            //签名
            const sign = crypto.createSign('SHA256');
            sign.update(dataString);
            sign.end();
            const signature = sign.sign(privateKey, 'base64');
            const token = `${dataArray[0]}|${dataArray[1]}|${signature}`;
            return token;
        }
        else {
            console.log(user.password);
            console.log(encryptedPassword);
            throw Error("username or password incorrect.");
        }
    });
}
function getUserInfoS() {
    return __awaiter(this, void 0, void 0, function* () {
        const store = UserInfoHolder_1.default.getStore();
        console.log("get user email from threadlocal");
        console.log(store === null || store === void 0 ? void 0 : store.get("loginEmail"));
        console.log("get user info");
    });
}
