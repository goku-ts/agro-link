import express from "express"
require('dotenv').config({path:"../.env"});

import { dbConnect } from "./db/connection.db"
import cors from "cors"
import { userRouter} from "./route/user.routes"
import { mainRouter } from "./route/main.routes"
import { Auth } from "./middlewares/auth.middleware"


const app = express()

app.use(express.json())
app.use(cors())
app.use("/user", userRouter)
app.use("/main", mainRouter)


const PORT = process.env.PORT 


app.listen(PORT, () => dbConnect())