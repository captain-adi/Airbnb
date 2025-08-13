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


app.get('/api/listings', async (req, res) => {
  const listings = await Listing.find({});
  res.json(listings);
});

app.get('/api/listings/:id',async (req,res)=>{
  const {id} = req.params;
  const listings = await Listing.findById(id);
  res.json(listings)
})



app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});