"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const fs_1 = require("fs");
const path_1 = require("path");
// 生成公私钥对
const { publicKey, privateKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
    },
});
// 将公钥和私钥写入文件
(0, fs_1.writeFileSync)((0, path_1.join)('./', 'publicKey.pem'), publicKey);
(0, fs_1.writeFileSync)((0, path_1.join)('./', 'privateKey.pem'), privateKey);
console.log('Keys generated and saved to files');
