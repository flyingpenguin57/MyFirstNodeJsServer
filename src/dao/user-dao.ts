import pool from '../config/db';
import { User } from './model/user';

export async function queryUserByUserName(username: string):Promise<User[]> {
    const query = 'SELECT * FROM User WHERE username = ?'
    const [rows] = await pool.execute(query, [username])
    const users: User[] = (rows as User[])
    return users
}   

export async function queryUserByEmail(email: string):Promise<User[]> {
    const query = 'SELECT * FROM User WHERE email = ?'
    const [rows] = await pool.execute(query, [email])
    const users: User[] = (rows as User[])
    return users
}   

export async function insertUser(user: User) {
    const query = 'INSERT INTO User (username, email, password, phone) VALUES (?, ?, ?, ?)';
    await pool.execute(query, [user.username, user.email, user.password, user.phone]);
}   