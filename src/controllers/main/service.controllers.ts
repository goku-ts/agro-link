import  { Response, Request } from "express"
import { validateService } from "../../services/validationService"
import { Service } from "../../model/service.models"
import { logger } from "../../services/logger.service"
import { UserRegisterTypes } from "../../types/types"
import { ImageUpload } from "../image.upload"
import { AuthRequest } from "../../middlewares/auth.middleware"

export const addService =  async (req: AuthRequest, res: Response) => {
    try {
        const { error } = validateService(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })

        const addService = new Service({
            ...req.body,
            seller: req.user
        })
        const service = await addService.save()

        res.json({
            message: "SUCCESS",
            service: service
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getService =  async(req: Request, res: Response) => {
    try {
        const service_id = req.params.id
        const service = await Service.findById({ _id: service_id }).populate({ path: "seller", select: "name" })
        if (!service) return res.json({
            message: "no service with given id found"
        })
        res.json({
            message: "SUCCESS",
            service: service
        })

    } catch (error) {
        logger.error(error)
    }
}

export const getAllServices =  async (req: Request, res: Response) => {
    try {

        const service = await Service.find().populate({ path: "seller", select: "name" })
        res.json({
            message: "SUCCESS",
            service: service
        })

    } catch (error) {
        logger.error(error)
    }
}

export const updateService =  async (req: Request, res: Response) => {
    try {
        const service_update = req.body
        const service_id = req.params.id
        const service = await Service.findByIdAndUpdate({ _id: service_id }, service_update)
        if (!service) return res.json({
            message: "no service with given id found"
        })
        // const update = await service.save()
        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }
}

export const deleteService = async (req: Request, res: Response) => {
    try {
        const service_id = req.params.id
        const service = await Service.findByIdAndDelete({ _id: service_id })
        if (!service) return res.json({
            message: "no service with given id found"
        })
        res.json({
            message: "SUCCESS",
            deleted: service
        })

    } catch (error) {
        logger.error(error)
    }
}

export const uploadServiceImage = async (req: Request, res: Response) => {
    const userId = req.params.id
    const body: UserRegisterTypes = req.body
    try {
        const service = await Service.findById({ _id: userId })
        if (!service) res.json({
            message: "service not found, could not upload image"
        })

        const result = await ImageUpload(req.file)
         if (!result) return res.json({
            message: "image updload fail"
        })

        body.image = result
        const update = await Service.findByIdAndUpdate({ _id: userId },{...body})
        res.json({
            message: "SUCCESS"
        })

    } catch (error) {
        logger.error(error)
    }

}

export const getUserAllService = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user
        const produce = await Service.find({seller : userId})
        res.json({
            message: "SUCCESS",
            produce: produce
        })

    } catch (error) {
        logger.error(error)
    }
}