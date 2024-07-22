import { privateDecrypt } from "crypto"
import { User } from "../controller/request/user-request"
import { User as UserDao } from "../dao/model/user"
import { insertUser, queryUserByEmail, queryUserByUserName } from "../dao/user-dao"
import { readFileSync } from 'fs'
import { join } from 'path'
import UserInfoHolder from "../middleware/threadlocal/UserInfoHolder"

const { keccak256 } = require('js-sha3')
const crypto = require('crypto')
const privateKey = readFileSync(join('./src/crypto', 'privateKey.pem'), 'utf8')

export async function createNewUser(user: User) {
    const users1 = await queryUserByEmail(user.email)
    const users2 = await queryUserByUserName(user.username)
    if (users1.length > 0 || users2.length>0) {
        throw new Error("username or email already exist.") 
    }

    //加密
    //const data = "Hello, this is a secret message!"; 原始数据
    //const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data)); 公钥加密
    //const base64EncryptedData = encryptedData.toString('base64'); 加密结果转成base64字符串

    //解密密码
    //从base64字符串中恢复加密内容
    const encryptedDataBuffer = Buffer.from(user.password, 'base64')
    //私钥解密
    const decryptedData = privateDecrypt(privateKey, encryptedDataBuffer)
    //把解密后的数据hash,写入db
    const encryptedPassword = keccak256(decryptedData)

    const newUser: UserDao = {
        username: user.username,
        email: user.email,
        password: encryptedPassword,
        phone: user.phone,
    }
    await insertUser(newUser)
}

export async function loginS(user: User): Promise<string> {
    const users = await queryUserByEmail(user.email)
    if (users.length <= 0) {
        throw new Error("user not exist.") 
    }

    //加密
    //const data = "Hello, this is a secret message!"; 原始数据
    //const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(data)); 公钥加密
    //const base64EncryptedData = encryptedData.toString('base64'); 加密结果转成base64字符串

    //解密密码
    //从base64字符串中恢复加密内容
    const encryptedDataBuffer = Buffer.from(user.password, 'base64')
    //私钥解密
    const decryptedData = privateDecrypt(privateKey, encryptedDataBuffer)
    //把解密后的数据hash,写入db
    const encryptedPassword = keccak256(decryptedData)

    if (encryptedPassword.toString() === users[0].password) {
        console.log(`login success, email = ${user.email}`)
        //generate token
        const dataArray = [user.email, Date.now() + 2 * 60 * 1000];
        const dataString = dataArray.join('|');  // 使用 '|' 作为分隔符，可以根据需要修改
        //签名
        const sign = crypto.createSign('SHA256')
        sign.update(dataString)
        sign.end()
        const signature = sign.sign(privateKey, 'base64');
        const token = `${dataArray[0]}|${dataArray[1]}|${signature}`
        return token
    } else {
        console.log(user.password)
        console.log(encryptedPassword)
        throw Error("username or password incorrect.")
    }
}

export async function getUserInfoS() {
    const store = UserInfoHolder.getStore()
    console.log("get user email from threadlocal")
    console.log(store?.get("loginEmail"))
    console.log("get user info")
}