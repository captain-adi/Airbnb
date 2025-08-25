import connectDB from "./src/db/db.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import listingRoutes from "./src/routes/listing_route.js";
import reviewRoutes from "./src/routes/review_route.js";
import authRoutes from "./src/routes/auth_route.js"
import passport from "passport";
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
}).catch((err) => {
  console.error("Database connection failed:", err);
});

app.use(cookieParser());
app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api/listings", listingRoutes);
app.use("/api/listings/:listingId/reviews", reviewRoutes);
app.use("/api/auth" , authRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Internal Server Error" } = err;
  res.status(statusCode).json({ message: err.message, success: false });
});
