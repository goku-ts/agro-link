import { Response, Request } from "express"

import { validateProduct } from "../../services/validationService"
import { Produce } from "../../model/produce.model"
import { logger } from "../../services/logger.service"
import { ImageUpload } from "../image.upload"

import { AuthRequest } from "../../middlewares/auth.middleware"

import { addToDB, getFromDB, getAllFromDB, updateToDB, deleteFromDB, getByUserFromDB } from "../../db/operations/db.operations"

export const addProduce = async (req: AuthRequest, res: Response) => {
    try {
        const result = await addToDB(req, Produce, validateProduct)

        res.json({
            message: "SUCCESS",
            produce: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const result = await getAllFromDB(req, Produce, "seller", "name")
        res.json({
            message: "SUCCESS",
            produce: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getProduce = async (req: Request, res: Response) => {
    try {
        const result = await getFromDB(req, Produce, "seller", "name", "product")
        res.json({
            message: "SUCCESS",
            produce: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const updateProduce = async (req: Request, res: Response) => {
    try {
        await updateToDB(req, Produce, "produce")

        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }
}

export const deleteProduce = async (req: Request, res: Response) => {
    try {
        const result = await deleteFromDB(req, Produce, "produce")
        res.json({
            message: "SUCCESS",
            deleted: result
        })

    } catch (error) {
        logger.error(error)
    }
}

export const uploadProduceImage = async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body
    try {
        const produce = await Produce.findById({ _id: id })
        if (!produce) res.json({
            message: "produce not found, could not upload image"
        })

        const result = await ImageUpload(req.file)
        if (!result) return res.json({
            message: "image updload fail"
        })

        body.image = result
       await Produce.findByIdAndUpdate({ _id: id }, { ...body })
        res.json({
            message: "UPDATED"
        })

    } catch (error) {
        logger.error(error)
    }

}

export const getUserAll = async (req: AuthRequest, res: Response) => {
    try {
        const result = await getByUserFromDB(req, Produce)
        res.json({
            message: "SUCCESS",
            result: result
        })

    } catch (error) {
        logger.error(error)
    }
}