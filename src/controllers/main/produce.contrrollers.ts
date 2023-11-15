import { Response, Request } from "express"

import { ProduceTypes, UserRegisterTypes } from "../../types/types"
import { validateProduct } from "../../services/validationService"
import { Produce } from "../../model/produce.model"
import { logger } from "../../services/logger.service"
import { ImageUpload } from "../image.upload"

import { AuthRequest } from "../../middlewares/auth.middleware"

export const addProduce = async (req: AuthRequest, res: Response) => {
    try {
        const { error } = validateProduct(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })

        const addProduce = new Produce({
            ...req.body,
            seller: req.user
        })
        const produce = await addProduce.save()

        res.json({
            message: "SUCCESS",
            produce: produce
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {

        const produce = await Produce.find().populate({ path: "seller", select: "name" })
        res.json({
            message: "SUCCESS",
            produce: produce
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getProduce = async (req: Request, res: Response) => {
    try {
        const produce_id = req.params.id
        const produce = await Produce.findById({ _id: produce_id }).populate({ path: "seller", select: "name" })
        if (!produce) return res.json({
            message: "no produce with given id found"
        })
        res.json({
            message: "SUCCESS",
            produce: produce
        })

    } catch (error) {
        logger.error(error)
    }
}

export const updateProduce = async (req: Request, res: Response) => {
    try {
        const produce_update = req.body
        const produce_id = req.params.id
        const produce = await Produce.findByIdAndUpdate({ _id: produce_id }, produce_update)
        if (!produce) return res.json({
            message: "no produce with given id found"
        })

        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }
}

export const deleteProduce = async (req: Request, res: Response) => {
    try {
        const produce_id = req.params.id
        const produce = await Produce.findByIdAndDelete({ _id: produce_id })
        if (!produce) return res.json({
            message: "no produce with given id found"
        })
        res.json({
            message: "SUCCESS",
            deleted: produce
        })

    } catch (error) {
        logger.error(error)
    }
}

export const uploadProduceImage = async (req: Request, res: Response) => {
    const userId = req.params.id
    const body: UserRegisterTypes = req.body
    try {
        const produce = await Produce.findById({ _id: userId })
        if (!produce) res.json({
            message: "produce not found, could not upload image"
        })

        const result = await ImageUpload(req.file)
        if (!result) return res.json({
            message: "image updload fail"
        })

        body.image = result
        const update = await Produce.findByIdAndUpdate({ _id: userId }, { ...body })
        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }

}

export const getUserAll = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user
        const produce = await Produce.find({seller : userId})
        res.json({
            message: "SUCCESS",
            produce: produce
        })

    } catch (error) {
        logger.error(error)
    }
}