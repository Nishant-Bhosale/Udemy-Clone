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

const createCourse = asyncHandler(async (req, res) => {
	const { title, description, languageOfCourse, category, price } = req.body;

	const instructor = await Instructor.findOne({ studentID: req.student._id });

	console.log(instructor);

	if (!instructor) {
		res.status(400);
		throw new Error("Could not find Instructor");
	}

	const course = new Course({
		createdBy: instructor._id,
		title,
		description,
		languageOfCourse,
		category,
		price,
	});

	await course.save();

	res.status(201).json({ course });
});

export { getAllCourses, createCourse };
