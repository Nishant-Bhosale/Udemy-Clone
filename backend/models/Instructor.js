import mongoose from "mongoose";

const { Schema } = mongoose;

const InstructorSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	profession: {
		type: String,
		required: true,
	},
	aboutMe: {
		type: String,
	},
	studentID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Student",
		required: true,
		unique: true,
	},
	courses: [
		{
			courseID: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		},
	],
	numberOfCourses: {
		type: Number,
		default: 0,
	},
	numberOfReviews: {
		type: Number,
		default: 0,
	},
	image: {
		type: Buffer,
	},
});

const Instructor = mongoose.model("Instructor", InstructorSchema);

export default Instructor;
