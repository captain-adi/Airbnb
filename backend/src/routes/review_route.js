import express from 'express';
import { Listing } from '../models/listing_model.js';
import { validateReview } from '../middlewares/schemaValidator.js'; 
import asyncHandler from '../utils/asyncHandler.js';
import { Review } from '../models/review_model.js';
const router = express.Router({mergeParams:true}); 

// review routes
router.post('/', validateReview, asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const listing = await Listing.findById(req.params.listingId);
  const newReview = await Review.create({rating,comment});
  listing.reviews.push(newReview._id);
  await listing.save();
  res.send("New review created successfully");
}));

// delete Review
router.delete('/:reviewId', asyncHandler(async (req, res) => {
  const { listingId, reviewId } = req.params;
  await Listing.findByIdAndUpdate(listingId,{$pull : {reviews : reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.send("Review deleted successfully");
}))

export default router;