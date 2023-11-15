import mongoose from "mongoose";
import { ServiceTypes } from "../types/types";

export const serviceSchema = new mongoose.Schema<ServiceTypes>({
    name: {
        type : String,
        required : true
     },
    type: {
        type : String,
        default : "-"
     },
    description:{
        type : String,
        default : "-"
     },
     image: {
        type:String
     },
    working_hours : {
        type : String,
        default : "-"
     },
    rate : {
        type : Number,
        default : 0
     },
    isAvailable :{
        type : Boolean,
        default : false
     },
  

},)


export const Service = mongoose.model("Service", serviceSchema)