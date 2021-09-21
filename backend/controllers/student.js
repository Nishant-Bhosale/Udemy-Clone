import Student from "../models/Student.js";
import asyncHandler from "express-async-handler";
import Course from "../models/Course.js";

const purchaseCourse = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id);

	if (!course) {
		res.status(400);
		throw new Error("Course not found.");
	}

	console.log(course.title);

	console.log(req.student);
	res.status(200);
});

export { purchaseCourse };
