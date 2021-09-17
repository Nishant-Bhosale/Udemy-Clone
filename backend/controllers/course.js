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

//@ desc Create new course
//@ route /course
//@ access Private
const createCourse = asyncHandler(async (req, res) => {
	const { title, description, languageOfCourse, category, price } = req.body;

	const instructor = await Instructor.findOne({ studentID: req.student._id });

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

	instructor.courses.push(course._id);
	instructor.numberOfCourses++;

	await instructor.save();
	await course.save();

	res.status(201).json({ course });
});

//@ desc Get A specific course
//@ route /course/id
//@ access Public
const getCourse = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id)
		.populate("createdBy", [
			"name",
			"profession",
			"aboutMe",
			"numberOfCourses",
			"numberOfReviews",
		]) // 2nd argument is to return specified elements of the object
		.exec();

	if (!course) {
		res.status(400);
		throw new Error("Could not find course");
	}

	res.status(200).json({ course });
});
export { getAllCourses, createCourse, getCourse };
