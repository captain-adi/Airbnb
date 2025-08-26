import { Listing } from "../models/listing_model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const showAllListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
});

export const showListingById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id).populate("reviews").populate({path : 'owner' , select : "-password"});
  res.json(listings);
});

export const createListing = asyncHandler(async (req, res) => {
  const data = req.body;
  const ownerId = req.user._id;
  const newListing = await Listing.create({ ...data, owner: ownerId });
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
  const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  res.json(updatedListing);
});
