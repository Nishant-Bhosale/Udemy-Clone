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

export default courseReviewSchema;
