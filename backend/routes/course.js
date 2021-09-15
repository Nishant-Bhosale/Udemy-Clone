import express from "express";
import { authMiddleware, instructorMiddleware } from "../middleware/auth.js";
import {
	getAllCourses,
	createCourse,
	getCourse,
} from "../controllers/course.js";
const router = express.Router();

router.get("/courses", getAllCourses);

router
	.route("/course")
	.post(authMiddleware, instructorMiddleware, createCourse);

router
	.route("/course/:id")
	.get(authMiddleware, instructorMiddleware, getCourse);
export default router;
