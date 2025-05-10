import { Listeing } from "../models/listing.model.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const  showListing = wrapAsync(async (req, res) => {
  const data = await Listeing.find()
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");
  res.send(data);
});

export const createListing = wrapAsync(async (req, res, next) => {
  const listings = req.body.listing;
  console.log(listings);
  const newListings = await Listeing.create(listings);
  console.log(req.body);
  newListings.owner = req.body.listing.id;
  newListings.save();
  res.send("Created a Listing");
});

export const updateListing = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { listing } = req.body;
  const hotel = await Listeing.findByIdAndUpdate(
    id,
    { $set: listing },
    { new: true }
  );
  console.log("updated hotel info : ", hotel);
  res.send("updated hotel details");
});

export const deleteListing = wrapAsync(async (req, res) => {
  await req.listing.deleteOne(); // listing is already on req from middleware
  res.status(200).json(new ApiResponse(200, {}, "Listing deleted"));
});
