import express from "express"

import { addService,deleteService,getService,updateService,getAllServices, getUserAllService,} from "../controllers/main/service.controllers"
import {addProduce,deleteProduce,getProduce,updateProduce,getAll,getUserAll } from "../controllers/main/produce.contrrollers"

export const mainRouter = express.Router()



{/* service ROUTES*/}
mainRouter.post("/service/add", addService )
mainRouter.get("/service/", getAllServices )
mainRouter.get("/produce/user", getUserAllService )
mainRouter.get("/service/:id", getService )
mainRouter.put("/service/:id", updateService)
mainRouter.delete("/service/:id", deleteService )

{/* Produce ROUTES*/}
mainRouter.post("/produce/add", addProduce )
mainRouter.get("/produce/", getAll )
mainRouter.get("/produce/user", getUserAll )
mainRouter.get("/produce/:id", getProduce )
mainRouter.put("/produce/:id", updateProduce)
mainRouter.delete("/produce/:id", deleteProduce )



