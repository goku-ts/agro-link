
require('dotenv').config({path:"../.env"});
import { v2 as cloudinary } from 'cloudinary';

export const ImageUpload = async (file: any) => {

    const config = {
        cloud_name: process?.env?.CLOUD_NAME as string,
        api_key: process?.env?.CLOUD_API_KEY as string,
        api_secret: process?.env?.API_SECRET as string
    } 

    
    // Configure Cloudinary

    cloudinary.config(config);

    try {
        // Access uploaded file information

        if (!file) {
            return 'No file uploaded.'
        }
        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(file?.path, {
            folder: 'FarmGate', // Optional: specify a folder in Cloudinary
        });

        // You can save the Cloudinary URL or other information to a database if needed
        const cloudinaryUrl = result.secure_url;

        return cloudinaryUrl;
    } catch (error) {
        return 'Internal Server Error';
    }
};



