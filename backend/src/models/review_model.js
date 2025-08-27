import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    comment : {
        type: String,
        required: true
    }, 
    rating : {
        type : Number , 
        required : true , 
        min : 1 ,
        max : 5
    },
    author :{
        type : mongoose.Schema.Types.ObjectId , 
        ref : "User"
    }
} , {timestamps : true})


export const Review = mongoose.model("Review", reviewSchema);