import mongoose from "mongoose";

export const farmSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    land_size: {
        length: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        }
    },
    crops_grown: {
        type: Array,
        required: true
    }

},)


export const Farm = mongoose.model("Farm", farmSchema)