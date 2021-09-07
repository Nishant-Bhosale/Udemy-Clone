import express from "express";
import {
	getAllStudentProfile,
	createStudent,
	loginStudent,
} from "../controllers/auth.js";
const router = express.Router();

router.get("/all", getAllStudentProfile);
router.post("/signup", createStudent);
router.post("/login", loginStudent);

export default router;
