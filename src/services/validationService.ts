import Joi from  "joi"

import { FarmerTypes } from "../types/farmerTypes"


export const validateRegister=(body:FarmerTypes)=>{
    const validationschema = Joi.object<FarmerTypes>({
      name : Joi.string().required().min(5).max(30),
      email : Joi.string().email().required().min(5).max(30),
      password : Joi.string().required().min(8).max(25).pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
    })

    return validationschema.validate(body)
}

export const validateLogin=(body:FarmerTypes)=>{
    const validationschema = Joi.object<FarmerTypes>({
      email : Joi.string().email().required().min(5).max(30),
      password: Joi.string()
    })

    return validationschema.validate(body)
}



