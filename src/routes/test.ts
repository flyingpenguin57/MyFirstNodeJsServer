/**
 * 本路由测试使用
 */
import { Router, Request, Response } from 'express'

const router = Router()

//错误模拟
router.get('/error', (req: Request, res: Response) => {
  throw new Error('Something went wrong');
})

//post模拟
router.post('/data', (req: Request, res: Response) => {
  console.log(req.body)
  res.send('Data received')
})

export default router