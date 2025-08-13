import connectDB from "./src/db/db.js";
import dotenv from "dotenv";
import express  from "express";
import cors from "cors";
import { Listing } from "./src/models/listing_model.js";
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/api/testing",async(req,res)=>{
const newlisting = await Listing.create({
    title: "Test Listing",
    description: "This is a test listing",
    price: 100,
    image: "",
    country: "Test Country",
    location: "Test Location"
})
console.log(newlisting);
res.send("working fine")
})


app.get('/api/testing',async (req,res)=>{
  const listings = await Listing.find({});
  res.json(listings)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});