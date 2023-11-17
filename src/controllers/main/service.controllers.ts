import { Response, Request } from "express"

import { validateProduct } from "../../services/validationService"
import { Service } from "../../model/service.models"
import { logger } from "../../services/logger.service"
import { ImageUpload } from "../image.upload"
import { AuthRequest } from "../../middlewares/auth.middleware"

import { addToDB, getFromDB, getAllFromDB, updateToDB, deleteFromDB, getByUserFromDB } from "../../db/operations/db.operations"

export const addService = async (req: AuthRequest, res: Response) => {
    try {
        const result = await addToDB(req, Service, validateProduct)

        res.json({
            message: "SUCCESS",
            service: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getService = async (req: Request, res: Response) => {
    try {
        const result = await getFromDB(req, Service, "seller", "name", "service")
        res.json({
            message: "SUCCESS",
            service: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getAllServices = async (req: Request, res: Response) => {
    try {

        const result = await getAllFromDB(req, Service, "seller", "name")
        res.json({
            message: "SUCCESS",
            service: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const updateService = async (req: Request, res: Response) => {
    try {
        await updateToDB(req, Service, "service")
        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const result = await deleteFromDB(req, Service, "service")
        res.json({
            message: "SUCCESS",
            deleted: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const uploadServiceImage = async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body
    try {
        const service = await Service.findById({ _id: id })
        if (!service) res.json({
            message: "service not found, could not upload image"
        })

        const result = await ImageUpload(req.file)
        if (!result) return res.json({
            message: "image updload fail"
        })

        body.image = result
        const update = await Service.findByIdAndUpdate({ _id: id }, { ...body })
        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }

}

export const getUserAllService = async (req: AuthRequest, res: Response) => {
    try {
        const result = await getByUserFromDB(req, Service)
        res.json({
            message: "SUCCESS",
            produce: result
        })

    } catch (error) {
        logger.error(error)
    }
}