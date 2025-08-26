import { User } from "../models/user_models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/ErrorHandler.js";

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
   
  const accessToken = await newUser.generateAccessToken();

  res.status(201).cookie("accesstoken", accessToken, {
    httpOnly: true,
    secure: false,
  }).json({
    success: true,
    message: "user ragistered successfully",
    user: {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler("Invalid email or password", 401);
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new ErrorHandler("Invalid email or password", 401);
  }
  const accessToken = await user.generateAccessToken();

  const options = {
    httpOnly: true,
    secure: false,
  };

  res
    .status(200)
    .cookie("accesstoken", accessToken, options)
    .json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      accessToken,
    });
});

export const logout = asyncHandler(async (req,res,next) => {
  res.clearCookie("accesstoken");
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});



export const checkLogin = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "User is logged in",
    user: {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
});
