// db.ts
import mysql from 'mysql2';

// 创建一个连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'MyDataBase',
  waitForConnections: true,
  connectionLimit: 10, // 最大连接数
  queueLimit: 0 // 队列大小（0表示没有限制）
});

export default pool.promise(); // 使用 promise API
