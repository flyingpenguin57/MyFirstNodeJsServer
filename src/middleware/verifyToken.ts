import { NextFunction, Request, Response } from "express";
import { readFileSync } from "fs";
import { join } from "path";
import UserInfoHolder from "./threadlocal/UserInfoHolder";

const crypto = require('crypto')
const publicKey = readFileSync(join('./src/crypto', 'publicKey.pem'), 'utf8')

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
    // 从组合字符串中解析出原始数据
    const token = req.headers['token']
    if (token === undefined || typeof token !== 'string') {
        throw new Error("invalid token.")
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
    const isVerified = verify.verify(publicKey, signature, 'base64')
    if (isVerified) {
        if (expireTime <= Date.now()) {
            throw new Error("token expired.")
        }
        //todo:把email塞到上下文
        UserInfoHolder.getStore()?.set("loginEmail", loginEmail)
        console.log(UserInfoHolder.getStore()?.get("loginEmail"))
        console.log(`verify token success, email = ${loginEmail}`)
        next()
    } else {
        throw new Error("invalid token.")
    }
}

export default VerifyToken