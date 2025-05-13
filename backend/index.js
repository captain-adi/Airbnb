import { connectDB } from "./src/db/index.js";
import express from "express";
import { ErrorHandler } from "./src/utils/ErrorHandler.js";
import listingRouter from "./src/routes/listing_route.js";
import reviewRouter from "./src/routes/review_route.js";
import userRouter from "./src/routes/user_route.js";
import cors from "cors";
const app = express();
const PORT = 8080;
import cookieParser from "cookie-parser";
import { Listeing } from "./src/models/listing.model.js";
import { data } from "./src/data/data.js";

app.use(
  cors({
    origin: "https://airbnb-ten-sage.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();
app.get("", (req, res) => {
  res.send("working properly");
});

app.listen(PORT, () => {
  console.log(`app is listeing at port ${PORT}`);
});

app.get("/setdata", async (req, res) => {
  const setdata = await Listeing.insertMany(data);
  res.send("data set");
});

app.use("/api/listing", listingRouter);
app.use("/api/listing/:id/review", reviewRouter);
app.use("/api/user", userRouter);

app.get("/health", (req, res) => {
  res.send("Backend is healthy ✅");
});

app.all("*", (req, res, next) => {
  next(new ErrorHandler(400, "page is not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: errors.join(", ") });
  }
  res.status(statusCode).send(message);
});
