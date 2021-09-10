import express from "express";
import { authMiddleware, instructorMiddleware } from "../middleware/auth.js";
import {
	getInstructorProfile,
	getAllInstructors,
	deleteInstructorProfile,
} from "../controllers/instructor.js";

const router = express.Router();

router.get("/instructors", getAllInstructors);
router
	.route("/profile/instructor/:id")
	.get(authMiddleware, instructorMiddleware, getInstructorProfile)
	.delete(authMiddleware, instructorMiddleware, deleteInstructorProfile);

export default router;
