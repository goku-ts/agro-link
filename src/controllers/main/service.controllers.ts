import  { Response, Request } from "express"


export const addFarm =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "add farm route"
        })
        
    } catch (error) {
        
    }
}

export const getFarm =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "get farm route"
        })
        
    } catch (error) {
        
    }
}

export const updateFarm =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "update farm route"
        })
        
    } catch (error) {
        
    }
}

export const deleteFarm =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "delete farm route"
        })
        
    } catch (error) {
        
    }
}