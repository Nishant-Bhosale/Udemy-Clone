import Course from '../models/Course.js';
import asyncHandler from 'express-async-handler';
import Instructor from '../models/Instructor.js';

//@ desc Get all courses
//@ route /courses
//@ access Public/ for testing only
const getAllCourses = asyncHandler(async (req, res) => {
	const courses = await Course.find(
		{},
		{
			title: 1,
			createdBy: 1,
			price: 1,
			courseImage: 1,
			authorName: 1,
			courseImage: 1,
		},
	);
	//Get specific fields from mongodb

	if (courses.length === 0) {
		res.status(400);
		throw new Error('No courses found');
	}

	// courses.forEach((course) => {
	// 	console.log(course.courseImage);
	// 	console.log(course.courseImage.data);
	// 	course.courseImage.data.toString("base64");
	// });

	res.status(200).json({ courses });
});

//@ desc Create new course
//@ route /course
//@ access Private
const createCourse = asyncHandler(async (req, res) => {
	const { title, description, languageOfCourse, category, price } = req.body;

	if (price > 1000) {
		res.status(400);
		throw new Error('Price should be less than 1000');
	}

	const instructor = await Instructor.findOne({ studentID: req.student._id });

	if (!instructor) {
		res.status(400);
		throw new Error('Could not find Instructor');
	}

	const course = new Course({
		createdBy: instructor._id,
		title,
		authorName: req.student.name,
		description,
		languageOfCourse,
		category,
		price,
	});

	instructor.courses.push(course._id);
	req.student.coursesTaken.push(course._id);
	instructor.numberOfCourses++;

	await instructor.save();
	await req.student.save();
	await course.save();

	res.status(201).json({ course });
});

//@ desc Add course Image
//@ route /course/id/image
//@ access Private
const addCourseImage = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id);

	if (course.courseImage) {
		res.status(400);
		throw new Error('Image already exists');
	}

	course.courseImage = req.file.buffer;

	await course.save();
	res.status(201).json({ message: 'Image added successfully.' });
});

//@ desc Get A specific course
//@ route /course/id
//@ access Public
const getCourse = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id)
		.populate('createdBy', [
			'name',
			'profession',
			'aboutMe',
			'numberOfCourses',
			'numberOfReviews',
		]) // 2nd argument is to return specified elements of the object
		.exec();

	if (!course) {
		res.status(400);
		throw new Error('Could not find course');
	}

	res.status(200).json({ course });
});

export { getAllCourses, createCourse, getCourse, addCourseImage };
