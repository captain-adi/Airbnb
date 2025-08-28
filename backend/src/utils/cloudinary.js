import cloudinary from "../config/cloudinary_config.js";
import fs from "fs";
const uploadToCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        // upload the file in cloudinary
        const result = await cloudinary.uploader.upload(localFilePath , {
            resource_type : "image",
        })
        console.log("file uploaded successfully")
        fs.unlinkSync(localFilePath); // Delete the local file
        return result.url; 
    } catch (error) {
         fs.unlinkSync(localFilePath); // Delete the local file
         console.error("Error uploading file to Cloudinary:", error);
         return null;
    }
}
export default uploadToCloudinary;