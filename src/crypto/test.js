"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var fs_1 = require("fs");
var path_1 = require("path");
// 从文件中读取公钥和私钥
var publicKey = (0, fs_1.readFileSync)((0, path_1.join)('./', 'publicKey.pem'), 'utf8');
var privateKey = (0, fs_1.readFileSync)((0, path_1.join)('./', 'privateKey.pem'), 'utf8');
// 原始数据
var data = "Admin0000";
// 使用公钥加密
var encryptedData = (0, crypto_1.publicEncrypt)(publicKey, Buffer.from(data));
var base64EncryptedData = encryptedData.toString('base64');
console.log('Base64 Encrypted Data:', base64EncryptedData);
// 将 Base64 编码的加密数据转换回 Buffer
var encryptedDataBuffer = Buffer.from(base64EncryptedData, 'base64');
// 使用私钥解密
var decryptedData = (0, crypto_1.privateDecrypt)(privateKey, encryptedDataBuffer);
console.log('Decrypted Data:', decryptedData.toString());
