import asyncHandler from "express-async-handler";
import { findCourseInPurchasedCourses } from "../utils/helperFunctions.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";

//@ desc Remove all courses
//@ route /course/remove
//@ access Private testing only
const removeAllCourses = asyncHandler(async (req, res) => {
	req.student.coursesTaken = [];
	await req.student.save();

	res.status(200).send("DELETED");
});

//@ desc Purchase a course
//@ route /course/id/purchase
//@ access Private
const purchaseCourse = asyncHandler(async (req, res) => {
	const alreadyPurchased = findCourseInPurchasedCourses(
		req.student,
		req.params.id,
	);

	if (alreadyPurchased) {
		res.status(404);
		throw new Error("Cannot purchase course");
	}

	const course = await Course.findById(req.params.id);

	if (!course) {
		res.status(400);
		throw new Error("Course not found.");
	}

	req.student.coursesTaken.push(course);

	await req.student.save();

	res.status(200).json({ message: "Course purchased successfully" });
});

//@ desc Refund a course
//@ route /course/id/refund
//@ access Private
const refundCourse = asyncHandler(async (req, res) => {
	const purchased = findCourseInPurchasedCourses(req.student, req.params.id);

	if (!purchased) {
		res.status(404);
		throw new Error("Cannot refund course");
	}

	const student = await Student.findByIdAndUpdate(req.student._id, {
		$pull: { coursesTaken: req.params.id },
	});

	res.status(200).json({ message: "Refund successful" });
});

//@ desc WishList a course
//@ route /course/id/wishlist
//@ access Private
const wishListCourse = asyncHandler(async (req, res) => {
	console.log(req.student.wishList);
	console.log(req.params.id);
});

export { wishListCourse, purchaseCourse, removeAllCourses, refundCourse };
