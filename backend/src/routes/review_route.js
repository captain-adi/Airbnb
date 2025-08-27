import express from "express";
import { validateReview } from "../middlewares/schemaValidator.js";
import {
  createReview,
  deleteReview,
} from "../controllers/review_controller.js";
import passport from "../middlewares/passport_middleware.js";
import { isAuther } from "../middlewares/isAuther.js";
const router = express.Router({ mergeParams: true });

router.route("/").post(validateReview, passport.authenticate("jwt", { session: false }), createReview);
router.route("/:reviewId").delete(passport.authenticate("jwt", { session: false }), isAuther, deleteReview);

export default router;
