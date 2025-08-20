import mongoose, { set } from "mongoose";
import { Review } from "./review_model.js";


const listingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        set : (v)=> v==='' ? "https://images.unsplash.com/photo-1600585154340-be6161a56a0c" : v  
    },
    country : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    }, 
     reviews : [
        {
         type : mongoose.Schema.Types.ObjectId,
         ref : "Review"
        }
     ]
},{timestamps : true});

listingSchema.post("findOneAndDelete",async (data)=>{
    await Review.deleteMany({ _id: { $in: data.reviews } });
})

export const Listing =mongoose.model("Listing", listingSchema);