import { Listing } from "../models/listing_model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const isOwner = asyncHandler(async (req,res,next)=>{
    const user = req.user;
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        return res.status(404).json({message: "Listing not found"});
    }
    if(listing.owner.toString() !== user._id.toString()){
        return res.status(403).json({message: "You are not the owner of this listing"});
    }
    next();
})
