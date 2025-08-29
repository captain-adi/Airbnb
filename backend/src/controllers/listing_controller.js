import { Listing } from "../models/listing_model.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadToCloudinary from "../utils/cloudinary.js";
import ErrorHandler from "../utils/ErrorHandler.js";
export const showAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
});

export const showListingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate("reviews")
    .populate({ path: "owner", select: "-password" })
    .populate({
      path: "reviews",
      populate: { path: "author", select: "-password" }
    });
  res.json(listing);
});

export const createListing = asyncHandler(async (req, res) => {
  const data = req.body;
  const ownerId = req.user._id;
  const imageUrl = await uploadToCloudinary(req.file.path);
  const newListing = await Listing.create({ ...data, owner: ownerId, image: imageUrl });
  console.log(newListing);
  res.send("new listing created");
});

export const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  res.send("Listing deleted successfully");
});

export const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  if (req.file) {
    const imageUrl = await uploadToCloudinary(req.file.path);
    updatedData.image = imageUrl;
  }
  const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.status(200).json({message : "Listing updated successfully", listing : updatedListing , success : true});
});
