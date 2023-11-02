import  { Response, Request } from "express"


export const addProduce =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "add Produce route"
        })
        
    } catch (error) {
        
    }
}

export const getProduce =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "get Produce route"
        })
        
    } catch (error) {
        
    }
}

export const updateProduce =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "update Produce route"
        })
        
    } catch (error) {
        
    }
}

export const deleteProduce =  (req: Request, res: Response) => {
    try {
        res.json({
            message : "delete Produce route"
        })
        
    } catch (error) {
        
    }
}