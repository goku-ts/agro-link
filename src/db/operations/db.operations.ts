

import { AuthRequest } from "../../middlewares/auth.middleware"



export const addToDB = async (request: AuthRequest, database: any, validation: any,) => {
    const { error } = validation(request.body)
    if (error) return error.details[0].message

    const add = new database({
        ...request.body,
        seller: request.user
    })
    return await add.save()
}

export const getFromDB = async (request: AuthRequest, database: any, populate_path?: string, populate_name?: string, collection_name?: string) => {
    const id = request.params.id
    const get = await database.findById({ _id: id }).populate({ path: populate_path, select: populate_name })
    if (!get) return `no data with given id available`
    return get
}

export const getAllFromDB = async (request: AuthRequest, database: any, populate_path?: string, populate_name?: string, collection_name?: string) => {
    const get = await database.find().populate({ path: populate_path, select: populate_name })
    if (get.length === 0) return `no data available`
    return get
}

export const updateToDB = async (request: AuthRequest, database: any, collection_name?: string) => {
    const get_update = request.body
    const id = request.params.id
    const get = await database.findByIdAndUpdate({ _id: id }, get_update)
    if (!get) return `no data with this id available`
    return get

}

export const deleteFromDB = async (request: AuthRequest, database: any, collection_name?: string) => {
    const id = request.params.id
    const get = await database.findByIdAndDelete({ _id: id })
    if (!get) return `no data with this id available`
    return get
}

export const getByUserFromDB = async (request: AuthRequest, database: any, collection_name?: string) => {
    const userId = request.user
    console.log(userId)
    const get = await database.find({ seller: userId })
    if (get.length === 0) return `no data available`
    return get
}