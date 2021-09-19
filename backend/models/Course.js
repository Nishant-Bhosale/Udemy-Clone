import mongoose from "mongoose";
import courseReviewSchema from "./CourseReview.js";

const { Schema } = mongoose;

const CourseSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Instructor",
		required: true,
	},
	authorName: {
		type: String,
		required: true,
	},
	languageOfCourse: {
		type: String,
		default: "English",
	},
	numOfStudents: {
		type: Number,
		default: 0,
	},
	avgRating: {
		type: Number,
		min: 0,
		max: 5,
		default: 0,
	},
	numOfRatings: {
		type: Number,
		default: 0,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		max: 1000,
	},
	courseImage: {
		type: Buffer,
	},
	courseRequirements: [
		{
			requirement: {
				type: String,
			},
		},
	],
	courseReviews: [courseReviewSchema],
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
