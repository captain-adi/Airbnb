import {Review} from "../models/review_model.js";
export const isAuther = async (req, res, next) => {
  const user = req.user;
  const { listingId, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (review.author.toString() !== user._id.toString()) {
    return res.status(403).json({ message: "You are not authorized to perform this action", success: false });
  }
  next();
};
