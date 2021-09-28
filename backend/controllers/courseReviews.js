import Course from "../models/Course.js";
import asyncHandler from "express-async-handler";
import Instructor from "../models/Instructor.js";
import {
	findCourseInPurchasedCourses,
	findReviewedCourses,
} from "../utils/helperFunctions.js";

//@ desc Review a course
//@ route /course/id/reviews
//@ access Private
const addReview = asyncHandler(async (req, res) => {
	const { reviewText, rating } = req.body;

	const course = await Course.findById(req.params.id);

	const purchasedCourse = findCourseInPurchasedCourses(
		req.student,
		req.params.id,
	);

	if (!purchasedCourse) {
		res.status(404);
		throw new Error("Buy the course to review it.");
	}

	const reviewed = findReviewedCourses(course, req.student._id);

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

	course.courseReviews.push(review);

	course.avgRating =
		course.courseReviews.reduce((acc, review) => {
			return review.rating + acc;
		}, 0) / course.courseReviews.length;

	course.numOfRatings++;
	instructor.numberOfReviews += 1;

	await course.save();
	await instructor.save();
	res.status(201).json({ message: "Course Reviewed" });
});

//@ desc Remove a Review
//@ route /course/id/reviews
//@ access Private
const deleteReview = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id);

	const purchasedCourse = findCourseInPurchasedCourses(
		req.student,
		req.params.id,
	);

	if (!purchasedCourse) {
		res.status(404);
		throw new Error("Buy the course to review it.");
	}

	const reviewed = findReviewedCourses(course, req.student._id);

	if (!reviewed) {
		res.status(404);
		throw new Error("Review not found");
	}

	console.log("LOADING");
	const filtered = course.courseReviews.filter((courseReview) => {
		return courseReview.user.toString() === req.student._id.toString();
	});

	course.courseReviews = filtered;
	await course.save();
	res.status(200).json({ message: "Deleted Successfully" });
});

const deleteAllReviews = asyncHandler(async (req, res) => {
	const course = await Course.findById(req.params.id);

	course.courseReviews = [];
	await course.save();
});

export { addReview, deleteReview, deleteAllReviews };
