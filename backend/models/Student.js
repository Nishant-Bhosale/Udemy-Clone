import mongoose from "mongoose";

const { Schema } = mongoose;

const StudentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: Buffer,
		},
		isInstructor: {
			type: Boolean,
			required: true,
			default: false,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Student", StudentSchema);
