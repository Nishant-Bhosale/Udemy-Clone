import express from "express";
import { authMiddleware, instructorMiddleware } from "../middleware/auth.js";
import { getAllCourses, createCourse } from "../controllers/course.js";
const router = express.Router();

router.get("/courses", authMiddleware, instructorMiddleware, getAllCourses);

router
	.route("/course")
	.post(authMiddleware, instructorMiddleware, createCourse);

export default router;
