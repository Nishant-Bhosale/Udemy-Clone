import Student from "../models/Student.js";
import asyncHandler from "express-async-handler";
import { findCourseInPurchasedCourses } from "./course.js";
import Course from "../models/Course.js";

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
	const course = await Course.findById(req.params.id);

	if (!course) {
		res.status(400);
		throw new Error("Course not found.");
	}

	const alreadyPurchased = findCourseInPurchasedCourses(
		req.student,
		req.params.id,
	);

	if (alreadyPurchased) {
		res.status(404);
		throw new Error("Cannot purchase course");
	}

	req.student.coursesTaken.push(course);

	await req.student.save();

	res.status(200).json({ message: "Course purchased successfully" });
});

export { purchaseCourse, removeAllCourses };
