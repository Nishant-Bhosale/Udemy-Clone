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

	if (price > 1000) {
		res.status(400);
		throw new Error("Price should be less than 1000");
	}

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

//@ desc Review a course
//@ route /course/id/reviews
//@ access Private
const addReview = asyncHandler(async (req, res) => {
	const { reviewText, rating } = req.body;

	const course = await Course.findById(req.params.id);

	console.log(course);
	const reviewed = course.courseReviews.find((review) => {
		return review.user.toString() === req.student._id.toString();
	});

	if (reviewed) {
		res.status(404);
		throw new Error("Cannot review more than once");
	}

	const review = {
		name: req.student.name,
		reviewText,
		rating,
		user: req.student._id,
	};

	const instructor = await Instructor.findById(course.createdBy);
	console.log(instructor);

	course.courseReviews.push(review);
	instructor.numberOfReviews += 1;

	await course.save();
	await instructor.save();
	res.status(201).json({ message: "Course Reviewed" });
});

//@ desc Delete all reviews of a course
//@ route /course/id/reviews
//@ access  Private
const deleteReviews = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id);
	course.courseReviews = [];
	await course.save();
	res.status(200).json({ message: "Deleted Successfully" });
});

export { getAllCourses, createCourse, getCourse, addReview, deleteReviews };
