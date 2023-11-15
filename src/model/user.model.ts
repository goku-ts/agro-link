import mongoose, { Schema } from "mongoose";
import { UserRegisterTypes } from "../types/types";

const userSchema = new mongoose.Schema<UserRegisterTypes>({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["Buyer", "Seller", "Logistics"],
        required: true
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    region: {
        type: String,
        default: "-"
        // required: true
    },
    farm_size: {
        length: {
            type: Number,
            default: "-"
            // required: true
        },
        width: {
            type: Number,
            default: "-"
            // required: true
        },
    },
    crops_cultivated: {
        type: [String],
        default: ["-"]
        // required: true
    },
    farm_location: {
        type: String,
        default: "-"
        // required: true
    },
    document_type: {
        type: {
            type: String,
            enum: ["Ghana Card", "Business Registration"],
            // required: true
        },
        ref_url: {
            type: String,
            default: "-"
            // required: true
        }
    }

},
    {
        timestamps: true
    })


export const User = mongoose.model("User", userSchema)