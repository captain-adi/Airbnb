import express from 'express';
import { Listing } from '../models/listing_model.js';
import asyncHandler from '../utils/asyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { validateListing } from '../middlewares/schemaValidator.js';
const router = express.Router();
// show all listing
router.get('/', asyncHandler(async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
})); 

//show one listing by id  
router.get('/:id',asyncHandler(async (req,res)=>{
  const {id} = req.params;
  const listings = await Listing.findById(id).populate("reviews");
  res.json(listings)
})) 
// create new listing
router.post('/', validateListing, asyncHandler(async (req, res) => {
  const data = req.body;
  const newListing = await Listing.create(data);
  res.send("new listing created");
}));


//delete listing
router.delete("/:id", asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const deletedListing = await Listing.findByIdAndDelete(id);
  res.send("Listing deleted successfully");
}));

//update listing
router.patch('/:id', validateListing ,asyncHandler(  async (req, res) => {
const { id } = req.params;
const updatedData = req.body;
if (!updatedData.title || !updatedData.description || !updatedData.price ||
  !updatedData.location || !updatedData.country) {
    throw new ErrorHandler("No data provided for update", 400);
  }
const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });
res.json(updatedListing);
}));


export default router;