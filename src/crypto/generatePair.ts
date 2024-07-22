import { generateKeyPairSync } from 'crypto';
import { writeFileSync } from 'fs';
import { join } from 'path';

// 生成公私钥对
const { publicKey, privateKey } = generateKeyPairSync('rsa', {
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
writeFileSync(join('./', 'publicKey.pem'), publicKey);
writeFileSync(join('./', 'privateKey.pem'), privateKey);

console.log('Keys generated and saved to files');
