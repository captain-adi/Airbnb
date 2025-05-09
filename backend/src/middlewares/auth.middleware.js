import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import jwt from "jsonwebtoken";

export const auth = wrapAsync(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    throw new ErrorHandler(401, "Access token missing");
  }

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  req.user = await User.findById(decodedToken._id).select("-password -refreshToken");

  if (!req.user) {
    throw new ErrorHandler(401, "User not found"); // 404 is more appropriate than 501
  }

  next();
});

