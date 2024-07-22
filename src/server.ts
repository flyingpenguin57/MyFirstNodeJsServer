import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRouter from './routes/user'
import testRouter from './routes/test'
import requestLog from './middleware/requestLog'
import resultLog from './middleware/resultLog'
import errorLogger from './logger/CommonErrorLogger'


const app = express()
const port = 3000

// 使用 body-parser 解析 JSON 请求体
app.use(bodyParser.json())

app.use(requestLog)
// 自定义中间件来捕获响应体
app.use(resultLog);

app.use("/test", testRouter)
app.use("/user", userRouter)

// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: false,
    errorMessage: err.message
  })
  errorLogger.error(err.message)
  next()
})

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});
