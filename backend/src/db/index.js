import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_DATABASE_URL);
    console.log("CONNECTED SUCCESSFULL : ")
  } catch (error) {
    console.log(error)
  }
};
