import Joi from "joi"

import { UserLoginTypes, UserRegisterTypes, ProduceTypes, ServiceTypes } from "../types/types"


export const validateRegister = (body: UserRegisterTypes) => {
  const validationschema = Joi.object<UserRegisterTypes>({
    name: Joi.string().required().min(5).max(30),
    phone_number: Joi.number().required().min(9),
    image: {
      name:Joi.string(),
      uri : Joi.string()
    },
    password: Joi.string().required().min(6).max(25),
    type: Joi.string().required(),
    region: Joi.string(),
    farm_size: {
      length: Joi.number(),
      width: Joi.number(),
    },
    crops_cultivated: Joi.array(),
    farm_location: Joi.string(),
    document_type: {
      type: Joi.string(),
      ref_url: Joi.string()
    }
    // .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
  })

  return validationschema.validate(body)
}

export const validateLogin = (body: UserLoginTypes) => {
  const validationschema = Joi.object<UserLoginTypes>({
    phone_number: Joi.number().required().min(9),
    password: Joi.string().required().min(6).max(25)
    // .pattern(new RegExp("^[a-zA-Z0-9@]{3,30}$"))
  })

  return validationschema.validate(body)
}


export const validateProduct = (body: ProduceTypes) => {
  const validationschema = Joi.object<ProduceTypes>({
    name: Joi.string().required(),
    description: Joi.string(),
    image: {
      name:Joi.string(),
      uri : Joi.string()
    },
    variety: Joi.string(),
    origin: Joi.string(),
    harvest_date: Joi.date(),
    unit_price: Joi.string(),
    quantity: Joi.number(),
    type: Joi.string(),
    isAvailable: Joi.boolean()
  })

  return validationschema.validate(body)
}

export const validateService = (body: ServiceTypes) => {
  const validationschema = Joi.object<ServiceTypes>({
    name: Joi.string().required(),
    type: Joi.string(),
    description: Joi.string(),
    image: {
      name:Joi.string(),
      uri : Joi.string()
    },
    working_hours: Joi.string(),
    rate: Joi.number(),
    isAvailable: Joi.boolean(),
  })

  return validationschema.validate(body)
}


