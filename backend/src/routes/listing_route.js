import express from "express";
const router = express.Router();
import { auth } from "../middlewares/auth.middleware.js";
import { checkOwner } from "../middlewares/checkOwner.middleware.js";
import {
  createListing,
  deleteListing,
  showListing,
  updateListing,
} from "../controllers/listing_controllers.js";

router.route("").get(showListing);
router.route("/create").post(auth, createListing);
router.route("/update/:id").post(auth, checkOwner, updateListing);
router.route("/delete/:id").post(auth, checkOwner, deleteListing);

export default router;
