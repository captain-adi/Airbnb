import { wrapAsync } from "../utils/wrapAsync.js";
import { Listeing } from "../models/listing.model.js";

export const checkOwner = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listeing.findById(id);

  if (!listing) {
    throw new ErrorHandler(404, "Listing not found");
  }
console.log(listing.owner._id);
console.log(req.user._id)
  if (!listing.owner.equals(req.user._id)) {
    throw new ErrorHandler(
      403,
      "You are not authorized to modify this listing"
    );
  }

  req.listing = listing;

  next();
});
