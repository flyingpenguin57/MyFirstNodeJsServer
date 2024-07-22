import { Router } from 'express'
import { getUserInfo, login, register } from '../controller/user-controller'
import asyncHandler from './util/async-handler'
import VerifyToken from '../middleware/verifyToken'
import CreateStore from '../middleware/threadlocal/CreateStore'

const router = Router()

router.post('/register', asyncHandler(register))
router.post('/login', asyncHandler(login))
router.post('/userInfo', CreateStore, asyncHandler(VerifyToken), asyncHandler(getUserInfo))

export default router