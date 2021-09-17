import mongoose from "mongoose";

const { Schema } = mongoose;
const courseReviewSchema = new Schema({
	reviewText: {
		type: String,
		maxlength: 150,
	},
	reviewFor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
});

const CourseReview = mongoose.model("CourseReview", courseReviewSchema);

export default CourseReview;
