import mongoose, { Schema } from "mongoose";


const farmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
    store: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Produce"
    }]

},
    {
        timestamps: true
    })


export const Farmer = mongoose.model("User", farmerSchema)