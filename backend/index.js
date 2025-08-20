import connectDB from "./src/db/db.js";
import dotenv from "dotenv";
import express  from "express";
import cors from "cors";
import { Listing } from "./src/models/listing_model.js";
import asyncHandler from "./src/utils/asyncHandler.js";
import ErrorHandler from "./src/utils/ErrorHandler.js";
import {validateListing, validateReview} from "./src/middlewares/schemaValidator.js";
import { Review } from "./src/models/review_model.js";
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// show all listing
app.get('/api/listings', asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
}));

//show one listing by id  
app.get('/api/listings/:id',asyncHandler(async (req,res)=>{
  const {id} = req.params;
  const listings = await Listing.findById(id).populate("reviews");
  res.json(listings)
}))
// create new listing
app.post('/api/listings', validateListing, asyncHandler(async (req, res) => {
  const data = req.body;
  const newListing = await Listing.create(data);
  res.send("new listing created");
}));


//delete listing
app.delete("/api/listings/:id", asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const deletedListing = await Listing.findByIdAndDelete(id);
  res.send("Listing deleted successfully");
}));

//update listing
app.patch('/api/listings/:id', validateListing ,asyncHandler(  async (req, res) => {
const { id } = req.params;
const updatedData = req.body;
if (!updatedData.title || !updatedData.description || !updatedData.price ||
  !updatedData.location || !updatedData.country) {
    throw new ErrorHandler("No data provided for update", 400);
  }
const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });
res.json(updatedListing);
}));

// review routes
app.post('/api/listings/:id/reviews', validateReview, asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const listing = await Listing.findById(req.params.id);
  const newReview = await Review.create({rating,comment});
  listing.reviews.push(newReview._id);
  await listing.save();
  res.send("New review created successfully");
  console.log("New review created:", newReview);
}));

// delete Review
app.delete('/api/listings/:listingId/reviews/:reviewId', asyncHandler(async (req, res) => {
  const { listingId, reviewId } = req.params;
  await Listing.findByIdAndUpdate(listingId,{$pull : {reviews : reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.send("Review deleted successfully");
}))

// Error handling middleware
app.use((err,req,res,next)=>{
  const {statusCode = 500,message = "Internal Server Error"} = err;
  res.status(statusCode).json({message : err.message, success : false}); 
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});