import express from "express"

import { addFarm,deleteFarm,getFarm,updateFarm} from "../controllers/main/service.controllers"
import {addProduce,deleteProduce,getProduce,updateProduce } from "../controllers/main/produce.contrrollers"

export const mainRouter = express.Router()



{/* service ROUTES*/}
mainRouter.post("/service/add", addFarm )
mainRouter.get("/service/get", getFarm )
mainRouter.put("/service/:id", updateFarm)
mainRouter.delete("/service/:id", deleteFarm )

{/* Produce ROUTES*/}
mainRouter.post("/produce/add", addProduce )
mainRouter.get("/produce/get", getProduce )
mainRouter.put("/produce/:id", updateProduce)
mainRouter.delete("/produce/:id", deleteProduce )


