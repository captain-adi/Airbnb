import { User } from "../models/user_models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const login = asyncHandler(async (req, res, next) => {
  console.log("working fine");
});

export const ragister = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ErrorHandler("user is already ragistered", 401);
  }
  const newUser = await User.create({
    username: username.toLowerCase(),
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "user ragistered successfully",
  });
});
