import { Router } from "express";
import { getUser } from "../controllers/userController.js";

const userRouter = Router()
userRouter.get('/user', getUser)
export {userRouter}