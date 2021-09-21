import express from "express";
import { purchaseCourse } from "../controllers/student.js";
import { authMiddleware } from "../middleware/auth";
const router = express.Router();

router.route("/course/:id/purchase").post(authMiddleware, purchaseCourse);
