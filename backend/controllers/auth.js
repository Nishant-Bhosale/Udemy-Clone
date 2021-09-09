import Student from "../models/Student.js";
import asyncHandler from "express-async-handler";

// @desc Get all students
// @route /
// @access Public for now
const getAllStudentProfile = asyncHandler(async (req, res) => {
	const students = await Student.find({});
	res.json({ students });

	if (students.length === 0) {
		res.status(404);
		throw new Error("No Students found");
	}
});

// @desc Register Student
// @route /signup
// @access Public
const createStudent = asyncHandler(async (req, res) => {
	const { name, email, password, headline } = req.body;

	const isStudent = await Student.findOne({ email });

	if (!name) {
		res.status(404);
		throw new Error("Name is required");
	}

	if (isStudent) {
		res.status(404);
		throw new Error("Student already exists.");
	}

	const student = new Student({
		name,
		email,
		password,
		headline: headline ? headline : "",
	});

	const token = await student.generateAuthToken();

	res.status(201).json({ name, email, headline, token });
});

// @desc Login Student
// @route /login
// @access Public
const loginStudent = async (req, res) => {
	const { email, password } = req.body;

	const student = await Student.findStudentByCredentials(email, password);

	if (!student) {
		return res.status(400).json({ error: "Email or password is incorrect." });
	}

	const token = await student.generateAuthToken();

	console.log(token);
	res.status(200).json({
		name: student.name,
		email: student.email,
		headline: student.headline,
		token,
	});
};

// @desc Logout Student
// @route /logout
// @access Private
const logoutStudent = async (req, res) => {
	try {
		req.student.tokens = req.student.tokens.filter((token) => {
			return token.token != req.token;
		});

		await req.student.save();
		res.status(200).send();
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
};

// @desc Logout Student From all devices
// @route /logout/all
// @access Private
const logoutStudentFromAllDevices = async (req, res) => {
	try {
		req.student.tokens = [];

		await req.student.save();
		res.status(200).send();
	} catch (error) {}
};

export {
	getAllStudentProfile,
	createStudent,
	loginStudent,
	logoutStudent,
	logoutStudentFromAllDevices,
};
