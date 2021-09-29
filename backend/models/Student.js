import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const StudentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minLength: 7,
		},
		headline: {
			type: String,
			maxlength: 50,
		},
		isInstructor: {
			type: Boolean,
			default: false,
		},
		coursesTaken: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		wishList: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	},
);

StudentSchema.statics.findStudentByCredentials = async (email, password) => {
	try {
		const student = await Student.findOne({ email });

		if (!student) {
			throw new Error("User does not exist.");
		}

		const isPasswordCorrect = await bcrypt.compare(password, student.password);

		if (!isPasswordCorrect) {
			throw new Error("Please enter correct password.");
		}

		return student;
	} catch (error) {
		console.log(error);
	}
};

StudentSchema.methods.generateAuthToken = async function () {
	const student = this;

	const payload = { _id: student._id };

	const token = await jwt.sign(payload, process.env.SECRET_KEY);

	student.tokens = student.tokens.concat({ token });

	await student.save();

	return token;
};

StudentSchema.pre("save", async function (next) {
	const student = this;

	if (!student.isModified("password")) {
		next();
	}

	const hashedPassword = await bcrypt.hash(student.password, 9);

	student.password = hashedPassword;
});

const Student = mongoose.model("Student", StudentSchema);
export default Student;
