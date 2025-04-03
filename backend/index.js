import { connectDB } from "./src/db/index.js";
import express from "express";
import { Listeing } from "./src/models/listing.model.js";
const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

connectDB();

app.listen(PORT, () => {
  console.log(`app is listeing at port ${PORT}`);
});

app.get("/api/listing", async (req, res) => {
  const data = await Listeing.find();
  res.send(data);
});

// create route
app.post("/api/create", async (req, res) => {

    const listings = req.body.listing;
    console.log(listings);
    const newListings = await Listeing.create(listings);
    res.send("success full created");
    

 
});


// update Route
app.put("/api/listing/update/:id", async (req, res) => {
  const { id } = req.params;
  const { listing } = req.body;
  console.log(listing);
  const hotel = await Listeing.findByIdAndUpdate(
    id,
    { $set: listing },
    { new: true }
  );
  console.log("updated hotel info : ", hotel);
  res.send("updated hotel details");
});

// delete route
app.delete("/api/listing/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("worknging")
  const hotel = await Listeing.findByIdAndDelete(id, { new: true });
  console.log(hotel);
  res.send("deleted hotel")
});



