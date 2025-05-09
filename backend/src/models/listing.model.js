import mongoose, { Schema, set } from "mongoose";
import { Review } from "./review_model.js";
import { User } from "./user.model.js";
const listeingSchma = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxvZGdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      },
    },
    location: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    reviews : [
      {
        type : Schema.Types.ObjectId,
        ref : "Review"
      }
    ],
    owner : {
      type : Schema.Types.ObjectId,
      ref : "User"
    }
  },
  { timestamps: true }
);

listeingSchma.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany( {_id : {$in : listing.reviews}})
  }
})

export const Listeing = mongoose.model("Listeing", listeingSchma);
``