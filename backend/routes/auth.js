import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
	getAllStudentProfile,
	createStudent,
	getStudentProfile,
	updateStudentProfile,
	loginStudent,
	logoutStudent,
	logoutStudentFromAllDevices,
} from "../controllers/auth.js";

const router = express.Router();

router.get("/all", getAllStudentProfile);
router.post("/signup", createStudent);
router.post("/login", loginStudent);
router.post("/logout", authMiddleware, logoutStudent);
router.post("/logout/all", authMiddleware, logoutStudentFromAllDevices);
router
	.route("/profile/me")
	.get(authMiddleware, getStudentProfile)
	.put(authMiddleware, updateStudentProfile);

export default router;
