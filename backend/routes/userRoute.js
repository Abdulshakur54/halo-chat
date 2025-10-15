import { Router } from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import upload from '../lib/multer.js'

const userRouter = Router()
userRouter.get('/user', getUser)
userRouter.put('/:id', upload.single('profilePic'), updateUser)
export {userRouter}