import { Request, Response } from 'express'
import { User } from './request/user-request'
import { createNewUser, getUserInfoS, loginS } from '../service/user-service'
import { CommonResult } from './result/common-result'
import { LoginResult } from './result/login-result'

export const login = async (req: Request, res: Response) => {
    const user: User = req.body
    const token:string = await loginS(user)
    const loginResult:LoginResult = {
        token:token
    }
    const result: CommonResult<LoginResult> = {
        success: true,
        data: loginResult
    }
    res.status(200).json(result)
}

export const register = async (req: Request, res: Response) => {
    const user: User = req.body
    await createNewUser(user)
    const result: CommonResult<any> = {
        success: true
    }
    res.status(200).json(result)
}

export const getUserInfo = async(req: Request, res: Response) => {
    await getUserInfoS()
    const result: CommonResult<any> = {
        success: true
    }
    res.status(200).json(result)
}