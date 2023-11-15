import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import _ from "lodash"
import JWT from "jsonwebtoken"
require("dotenv").config()



import { User } from "../model/user.model"
import { UserLoginTypes, UserRegisterTypes } from "../types/types"
import { validateRegister, validateLogin } from "../services/validationService"
import { generateToken } from "../services/token.services"
import { comparePassword, hashPassword } from "../services/password.services"
import { logger } from "../services/logger.service"
import { ImageUpload } from "./image.upload"



export const Register = async (req: Request, res: Response) => {
    try {
        const { error } = validateRegister(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })

        const newUser: UserRegisterTypes = req.body

        const user = await User.findOne({ phone_number: newUser.phone_number })

        if (user) return res.json({
            message: "User already has an account, try logging in"
        })


        newUser.password = await hashPassword(newUser.password)

        const addUser = new User(newUser)
        await addUser.save()

        res.json({
            status: "SUCCESS",
            user: _.pick(addUser, ["name"])
        })
    } catch (error) {
        logger.error(error)
    }
}



export const Login = async (req: Request, res: Response) => {

    try {

        const { error } = validateLogin(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })

        const userLogin: UserLoginTypes = req.body
        const user = await User.findOne({ phone_number: userLogin.phone_number })
        if (!user) return res.json({
            message: "incorrect username or password"
        })

        const validpassword = await comparePassword(userLogin.password, user.password)
        if (!validpassword) return res.json({
            message: "incorrect username or password"
        })

        const token = generateToken(user._id)


        res.header("token", token).json({
            status: "SUCCESS",
            token: token
        })
    } catch (error) {
        logger.error(error)
    }

}

export const uploadImage = async (req: Request, res: Response) => {
    const userId = req.params.id
    const body: UserRegisterTypes = req.body
    try {
        const user = await User.findById({ _id: userId })
        if (!user) res.json({
            message: "user not found, could not upload image"
        })

        const result = await ImageUpload(req.file)
         if (!result) return res.json({
            message: "image updload fail"
        })

        body.image = result
        const update = await User.findByIdAndUpdate({ _id: userId },{...body})
        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }

}