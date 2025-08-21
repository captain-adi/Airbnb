import express from "express";
import { validateReview } from "../middlewares/schemaValidator.js";
import {
  createReview,
  deleteReview,
} from "../controllers/review_controller.js";

const router = express.Router({ mergeParams: true });

router.route("/").post(validateReview, createReview);
router.route("/:reviewId").delete(deleteReview);

export default router;
