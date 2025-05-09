import { wrapAsync } from "../utils/wrapAsync.js";
import { Review } from "../models/review_model.js";
import { Listeing } from "../models/listing.model.js";

export const deleteReview = wrapAsync(async (req, res) => {
  const { id, reviewID } = req.params;
  await Listeing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
  await Review.findByIdAndDelete(reviewID);
  res.send("review deleted");
});

export const addReview = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listeing.findById(id);
  const NewReview = await Review.create(req.body.review);
  NewReview.author = req.user._id;
  await NewReview.save();
  listing.reviews.push(NewReview);
  await listing.save();
  res.send("new reivew saved");
});
