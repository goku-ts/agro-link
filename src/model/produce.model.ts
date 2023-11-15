import mongoose, { Schema } from "mongoose";
import { ProduceTypes } from "../types/types";

export const produceSchema = new mongoose.Schema<ProduceTypes>({
   name : {
      type : String,
      required : true
   },
   description: {
      type: String,
      default : "-"
   },
   image: {
      type:String
   },
   variety: {
      type:String,
      default : "-"
   },
   origin: {
      type : String,
      default : "-"
   },
   harvest_date: {
      type : String,
      default : "-"
   },
   unit_price: {
      type : String,
      default : "-"
   },
   quantity : {
      type : Number,
      default : 0
   },
   type: {
      type : String,
      default : "-"
   },
   isAvailable :{
      type : Boolean,
      default : false
   },
   seller :{
      type : Schema.Types.ObjectId,
      ref : "User",
      // required : true
   }

})


   export const Produce = mongoose.model("Produce", produceSchema)