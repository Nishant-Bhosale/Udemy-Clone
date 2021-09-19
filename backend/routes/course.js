import express from "express";
import { authMiddleware, instructorMiddleware } from "../middleware/auth.js";
import {
	getAllCourses,
	createCourse,
	getCourse,
	addReview,
	deleteReviews,
} from "../controllers/course.js";
const router = express.Router();

router.get("/courses", getAllCourses);

router
	.route("/course")
	.post(authMiddleware, instructorMiddleware, createCourse);

router.route("/course/:id").get(getCourse);

router
	.route("/course/:id/reviews")
	.post(authMiddleware, addReview)
	.delete(authMiddleware, deleteReviews);
export default router;
