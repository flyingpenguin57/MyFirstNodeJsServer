import { User } from "../controller/request/user-request";
import { User as UserDao } from "../dao/model/user";
import { insertUser, queryUserByEmail, queryUserByUserName } from "../dao/user-dao";

export async function createNewUser(user: User) {
    const users1 = await queryUserByEmail(user.email)
    const users2 = await queryUserByUserName(user.username)
    if (users1.length > 0 || users2.length>0) {
        throw new Error("username or email already exist.") 
    }

    const newUser: UserDao = {
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
    }
    await insertUser(newUser)
}