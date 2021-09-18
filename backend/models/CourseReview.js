import mongoose from "mongoose";

const { Schema } = mongoose;
const courseReviewSchema = new Schema(
	{
		name: {
			type: String,
		},
		reviewText: {
			type: String,
			maxlength: 150,
		},
		rating: {
			type: Number,
			max: 5,
			min: 0,
		},
		reviewFor: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Course",
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
	},
	{
		timestamps: true,
	},
);

const CourseReview = mongoose.model("CourseReview", courseReviewSchema);

export default CourseReview;
