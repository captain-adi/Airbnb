import express from "express";
const router = express.Router({ mergeParams: true });
import { auth } from "../middlewares/auth.middleware.js";
import { addReview, deleteReview } from "../controllers/review_controllers.js";

router.route("/").post(auth, addReview);
router.route("/:reviewID").delete(auth, deleteReview);

export default router;
