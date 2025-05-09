import express from "express";
const router = express.Router();

import { auth } from "../middlewares/auth.middleware.js";
import {
  login,
  logout,
  signup,
  varifyUser,
} from "../controllers/user_controllers.js";
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(auth, logout);
router.route("/me").get( auth,varifyUser);
export default router;
