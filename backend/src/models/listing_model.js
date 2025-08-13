import mongoose, { set } from "mongoose";


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
        set : (v)=> v==='' ? "https://unsplash.com/photos/white-bed-linen-with-throw-pillows-Yrxr3bsPdS0" : v  
    },
    country : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    }
},{timestamps : true});


export const Listing =mongoose.model("Listing", listingSchema);