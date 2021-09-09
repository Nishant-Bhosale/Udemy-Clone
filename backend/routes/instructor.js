import express from "express";
import { authMiddleware, instructorMiddleware } from "../middleware/auth.js";
import {
	getInstructorProfile,
	getAllInstructors,
} from "../controllers/instructor.js";

const router = express.Router();

router.get("/instructors", getAllInstructors);
router
	.route("/profile/instructor")
	.get(authMiddleware, instructorMiddleware, getInstructorProfile);

export default router;
