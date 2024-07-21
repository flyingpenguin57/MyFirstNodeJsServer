import { Request, Response } from 'express'
import { User } from './request/user-request'
import { createNewUser } from '../service/user-service'

export const login = (req: Request, res: Response) => {

}

export const register = async (req: Request, res: Response) => {
    const user: User = req.body
    throw new Error("hahaha")
    await createNewUser(user)
    res.status(200).send("success")
}