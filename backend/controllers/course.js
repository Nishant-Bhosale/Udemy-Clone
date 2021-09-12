import Course from "../models/Course.js";
import asyncHandler from "express-async-handler";
import Instructor from "../models/Instructor.js";

//@ desc Get all courses
//@ route /courses
//@ access Public/ for testing only

const getAllCourses = asyncHandler(async (req, res) => {
	const courses = await Course.find({});

	if (courses.length === 0) {
		res.status(400);
		throw new Error("No courses found");
	}

	res.status(200).json({ courses });
});

export { getAllCourses };
