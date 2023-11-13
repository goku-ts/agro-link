import express from "express"

import { Register,Login } from "../controllers/user.controller"



export const userRouter = express.Router()

userRouter.post("/register", Register)
userRouter.post("/login", Login)