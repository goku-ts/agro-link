import express from "express"

import { Register,Login } from "../controllers/farmerControllers"



export const userRouter = express.Router()

userRouter.post("/register", Register)
userRouter.post("/login", Login)