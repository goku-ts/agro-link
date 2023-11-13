import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import _ from "lodash"
import JWT from "jsonwebtoken"
require("dotenv").config()


import { User } from "../model/user.model"
import { UserTypes } from "../types/user.types"
import { validateRegister, validateLogin } from "../services/validationService"
import { generateToken } from "../services/token.services"
import { comparePassword, hashPassword } from "../services/password.services"

export const Register = async (req: Request, res: Response) => {
    try {
        const { error } = validateRegister(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })

        const newUser: UserTypes = req.body

        const user = await User.findOne({ email: newUser.email })

        if (user) return res.json({
            message: "User already has an account, try logging in"
        })

        
        newUser.password = await hashPassword(newUser.password)

        const addUser= new User(newUser)
        await addUser.save()

        res.json({
            status: "SUCCESS",
            user: _.pick(addUser, ["name"])
        })
    } catch (error) {

    }
}



export const Login = async (req: Request, res: Response) => {

    try {

        const { error } = validateLogin(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })

        const userLogin: UserTypes = req.body
        const user = await User.findOne({ email: userLogin.email})
        if (!User) return res.json({
            message: "incorrect username or password"
        })

        const validpassword = await comparePassword(userLogin.password , user.password)
        if (!validpassword) return res.json({
            message: "incorrect username or password"
        })

        const token = generateToken(user._id)
       

        res.header("token", token).json({
            status: "SUCCESS",
            token : token
        })
    } catch (error) {

    }

}