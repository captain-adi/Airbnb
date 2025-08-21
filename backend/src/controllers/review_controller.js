import { Listing } from "../models/listing_model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Review } from "../models/review_model.js";

export const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const listing = await Listing.findById(req.params.listingId);
  const newReview = await Review.create({ rating, comment });
  listing.reviews.push(newReview._id);
  await listing.save();
  res.send("New review created successfully");
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { listingId, reviewId } = req.params;
  await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.send("Review deleted successfully");
});
