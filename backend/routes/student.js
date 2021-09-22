import express from "express";
import { purchaseCourse, removeAllCourses } from "../controllers/student.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.route("/course/:id/purchase").post(authMiddleware, purchaseCourse);
router.route("/course/remove").delete(authMiddleware, removeAllCourses);

export default router;
