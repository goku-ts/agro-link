import express from "express"

import { addFarm,deleteFarm,getFarm,updateFarm} from "../controllers/main/farmControllers"
import {addProduce,deleteProduce,getProduce,updateProduce } from "../controllers/main/produceControllers"

export const mainRouter = express.Router()



{/* farm ROUTES*/}
mainRouter.post("/farm/add", addFarm )
mainRouter.get("/farm/get", getFarm )
mainRouter.put("/farm/:id", updateFarm)
mainRouter.delete("/farm/:id", deleteFarm )

{/* Produce ROUTES*/}
mainRouter.post("/produce/add", addProduce )
mainRouter.get("/produce/get", getProduce )
mainRouter.put("/produce/:id", updateProduce)
mainRouter.delete("/produce/:id", deleteProduce )


