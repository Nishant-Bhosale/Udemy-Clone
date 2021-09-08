import mongoose from "mongoose";

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
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "instructor",
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
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;
