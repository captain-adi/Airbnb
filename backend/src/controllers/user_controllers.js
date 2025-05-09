import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const signup = wrapAsync(async (req, res) => {
  const { email, password, username } = req.body;
  if (!email || !password) {
    throw new ErrorHandler(401, "credantial required");
  }
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) {
    throw new ErrorHandler(401, "username or password already ragistered");
  }

  const newuser = await User.create({
    username,
    email,
    password,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, { username, email }, "user created successfully")
    );
});

export const login = wrapAsync(async (req, res) => {
  const generateAccessAndRefreshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      console.error(error); // Only during developmen
      throw new ErrorHandler(
        400,
        "something went wrong while generating access and refresh token"
      );
    }
  };
  console.log("cookes : ", req.cookies);
  let { email, password } = req.body;
  if (!email || !password) {
    throw new ErrorHandler(400, "email and password is required");
  }
  password = String(password);
  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorHandler(404, "user does not exist");
  }
  const isPassCorrect = await bcrypt.compare(password, user.password);
  if (!isPassCorrect) {
    throw new ErrorHandler(401, "Invalid password");
  }

  //generate access and refresh token
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const option = {
    secure: true,
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: user.username,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        "user LoggedIN successfull"
      )
    );
});

export const logout = wrapAsync(async (req, res) => {

  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: "" }, // Prefer $unset over $set: { refreshToken: undefined }
  });
  const option = {
    secure: true,
    httpOnly: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "user logged Out"));
});

export const varifyUser = wrapAsync(async(req,res)=>{
  return res.status(200).json({ user: req.user });
})
