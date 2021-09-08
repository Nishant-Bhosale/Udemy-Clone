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
	courses: [
		{
			course: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "course",
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
	websiteLink: {
		type: String,
	},
	image: {
		type: Buffer,
	},
});

const Instructor = mongoose.model("Instructor", InstructorSchema);

export default Instructor;
