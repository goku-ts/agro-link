import mongoose from "mongoose"
require('dotenv').config({path:"../.env"});
import { logger } from "../services/logger.service";

const uri = process?.env?.DB_URI as string


const options = { useNewUrlParser: true, useUnifiedTopology: true };

export const dbConnect = () => {
    if(!uri){
        logger.error("no db connection found")
    }
    mongoose.connect(uri)
    .then(() => logger.info("connected to database"))
    .catch((e) =>logger.error(e))
}