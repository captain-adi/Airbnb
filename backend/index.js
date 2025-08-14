import connectDB from "./src/db/db.js";
import dotenv from "dotenv";
import express  from "express";
import cors from "cors";
import { Listing } from "./src/models/listing_model.js";
import dummyData from "./src/data/exampleData.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// show all listing
app.get('/api/listings', async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
});

//show one listing by id  
app.get('/api/listings/:id',async (req,res)=>{
  const {id} = req.params;
  const listings = await Listing.findById(id);
  res.json(listings)
})
// create new listing
app.post('/api/listings', async (req, res) => {
const data = req.body;
console.log(data);
const newListing = await Listing.create(data);
res.send("new listing created");
})


app.delete("/api/listings/:id", async (req, res) => {
  const { id } = req.params; 
  const deletedListing = await Listing.findByIdAndDelete(id);
  res.send("Listing deleted successfully");
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});