import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
		website: {
			type: String,
			required: false,
			unique: true,
		},
		headling: {
			type: String,
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

StudentSchema.pre("save", async function (next) {
	const user = this;

	if (!user.isModified("password")) {
		next();
	}

	const hashedPassword = await bcrypt.hash(user.password, 9);

	user.password = hashedPassword;
});

export default mongoose.model("Student", StudentSchema);
