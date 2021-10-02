import express from "express";
import { authMiddleware, instructorMiddleware } from "../middleware/auth.js";
import {
	getAllCourses,
	createCourse,
	getCourse,
	addCourseImage,
} from "../controllers/course.js";
import multer from "multer";
const router = express.Router();

//Use multer to upload Image
const uploadImage = multer({
	limits: {
		fileSize: 10000000,
	},
	fileFilter(req, file, cb) {
		if (
			!file.originalname.endsWith(file.originalname.split(".")[1]) ||
			!file.originalname.endsWith(file.originalname.split(".")[1]) ||
			!file.originalname.endsWith(file.originalname.split(".")[1])
		) {
			console.log(file.originalname.split(".")[1]);
			return cb(new Error("Please provide the right file"));
		}

		cb(undefined, true);
	},
});

router.get("/courses", getAllCourses);

router
	.route("/course")
	.post(authMiddleware, instructorMiddleware, createCourse);

router
	.route("/course/:id/image")
	.post(
		authMiddleware,
		instructorMiddleware,
		uploadImage.single("upload"),
		addCourseImage,
	);

router.route("/course/:id").get(getCourse);

export default router;
