"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const path_1 = require("path");
// 从文件中读取公钥和私钥
const publicKey = (0, fs_1.readFileSync)((0, path_1.join)('./', 'publicKey.pem'), 'utf8');
const privateKey = (0, fs_1.readFileSync)((0, path_1.join)('./', 'privateKey.pem'), 'utf8');
// 原始数据
const data = "Admin0000";
// 使用公钥加密
const encryptedData = (0, crypto_1.publicEncrypt)(publicKey, Buffer.from(data));
const base64EncryptedData = encryptedData.toString('base64');
console.log('Base64 Encrypted Data:', base64EncryptedData);
// 将 Base64 编码的加密数据转换回 Buffer
const encryptedDataBuffer = Buffer.from(base64EncryptedData, 'base64');
// 使用私钥解密
const decryptedData = (0, crypto_1.privateDecrypt)(privateKey, encryptedDataBuffer);
console.log('Decrypted Data:', decryptedData.toString());
