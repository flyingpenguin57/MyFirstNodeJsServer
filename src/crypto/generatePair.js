"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
var fs_1 = require("fs");
var path_1 = require("path");
// 生成公私钥对
var _a = (0, crypto_1.generateKeyPairSync)('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    },
}), publicKey = _a.publicKey, privateKey = _a.privateKey;
// 将公钥和私钥写入文件
(0, fs_1.writeFileSync)((0, path_1.join)('./', 'publicKey.pem'), publicKey);
(0, fs_1.writeFileSync)((0, path_1.join)('./', 'privateKey.pem'), privateKey);
console.log('Keys generated and saved to files');
