import express from "express";
import {
	purchaseCourse,
	removeAllCourses,
	wishListCourse,
	refundCourse,
	removeCourseFromWishList,
	getWishListedCourses,
} from "../controllers/student.js";
import { authMiddleware } from "../middleware/auth.js";
const router = express.Router();

router.route("/course/:id/purchase").post(authMiddleware, purchaseCourse);
router.route("/course/:id/refund").post(authMiddleware, refundCourse);
router
	.route("/course/:id/wishlist")
	.post(authMiddleware, wishListCourse)
	.delete(authMiddleware, removeCourseFromWishList);
router.route("/course/all/wishlist").get(authMiddleware, getWishListedCourses);
router.route("/course/remove").delete(authMiddleware, removeAllCourses);

export default router;
