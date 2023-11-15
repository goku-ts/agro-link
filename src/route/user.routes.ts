import express from "express"
import multer from 'multer';

import { Register,Login,uploadImage } from "../controllers/user.controller"


const storage = multer.diskStorage({}); // Store image in memory as a Buffer
const upload = multer({ storage: storage });


export const userRouter = express.Router()

userRouter.post("/register", Register)
userRouter.post("/login", Login)
userRouter.post("/upload/:id",upload.single('image'),uploadImage )