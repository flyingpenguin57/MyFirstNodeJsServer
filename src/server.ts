import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRouter from './routes/user'
import testRouter from './routes/test'

const app = express()
const port = 3000

// 使用 body-parser 解析 JSON 请求体
app.use(bodyParser.json())

app.use("/test", testRouter)
app.use("/user", userRouter)

// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Global error handler:', err);
  res.status(200).send({
    success: false,
    errorMessage: err.message
  });
})

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
