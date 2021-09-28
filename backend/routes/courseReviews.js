import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
	addReview,
	deleteReview,
	deleteAllReviews,
} from "../controllers/courseReviews.js";
const router = express.Router();

router
	.route("/course/:id/reviews")
	.post(authMiddleware, addReview)
	.delete(authMiddleware, deleteReview);

router.route("/course/reviews/:id").delete(deleteAllReviews);

export default router;
