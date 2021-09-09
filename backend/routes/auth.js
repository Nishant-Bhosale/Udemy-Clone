import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
	getAllStudentProfile,
	createStudent,
	loginStudent,
	logoutStudent,
} from "../controllers/auth.js";
const router = express.Router();

router.get("/all", getAllStudentProfile);
router.post("/signup", createStudent);
router.post("/login", loginStudent);
router.post("/logout", authMiddleware, logoutStudent);

export default router;
