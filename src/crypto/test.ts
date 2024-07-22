import { publicEncrypt, privateDecrypt } from 'crypto';
import { readFileSync } from 'fs';
import { join } from 'path';

// 从文件中读取公钥和私钥
const publicKey = readFileSync(join('./', 'publicKey.pem'), 'utf8');
const privateKey = readFileSync(join('./', 'privateKey.pem'), 'utf8');

// 原始数据
const data: string = "Admin0000";

// 使用公钥加密
const encryptedData: Buffer = publicEncrypt(publicKey, Buffer.from(data));
const base64EncryptedData: string = encryptedData.toString('base64');

console.log('Base64 Encrypted Data:', base64EncryptedData);

// 将 Base64 编码的加密数据转换回 Buffer
const encryptedDataBuffer: Buffer = Buffer.from(base64EncryptedData, 'base64');

// 使用私钥解密
const decryptedData: Buffer = privateDecrypt(privateKey, encryptedDataBuffer);

console.log('Decrypted Data:', decryptedData.toString());
