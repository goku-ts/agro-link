import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import _ from "lodash"
import JWT from "jsonwebtoken"
require("dotenv").config()


import { Farmer } from "../model/farmerModel"
import { FarmerTypes } from "../types/farmerTypes"
import { validateRegister, validateLogin } from "../services/validationService"
import { generateToken } from "../services/token.services"
import { comparePassword, hashPassword } from "../services/password.services"

export const Register = async (req: Request, res: Response) => {
    try {
        const { error } = validateRegister(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })

        const newFarmer: FarmerTypes = req.body

        const farmerAvailable = await Farmer.findOne({ email: newFarmer.email })

        if (farmerAvailable) return res.json({
            message: "Farmer already has an account, try logging in"
        })

        
        newFarmer.password = await hashPassword(newFarmer.password)

        const farmer = new Farmer(newFarmer)
        await farmer.save()

        res.json({
            status: "SUCCESS",
            user: _.pick(farmer, ["name"])
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

        const farmerLogin: FarmerTypes = req.body
        const farmer = await Farmer.findOne({ email: farmerLogin.email})
        if (!farmer) return res.json({
            message: "incorrect username or password"
        })

        const validpassword = await comparePassword(farmerLogin.password , farmer.password)
        if (!validpassword) return res.json({
            message: "incorrect username or password"
        })

        const token = generateToken(farmer._id)
       

        res.header("token", token).json({
            status: "SUCCESS",
            token : token
        })
    } catch (error) {

    }

}