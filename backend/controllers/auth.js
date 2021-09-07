import mongoose from "mongoose";
import Student from "../models/Student.js";

const getAllStudentProfile = async (req, res) => {
	try {
		const students = await Student.find({});
		res.json({ students });
	} catch (error) {
		console.log(error);
	}
};

const createStudent = async (req, res) => {
	const { name, email, password, headline, website } = req.body;

	try {
		const isStudent = await Student.findOne({ email });

		if (isStudent) {
			return res.status(404).json({ message: "Student already exists." });
		}

		const student = new Student({
			name,
			email,
			password,
			website: website ? website : "",
			headline: headline ? headline : "",
		});

		const token = await student.generateAuthToken();

		res.status(201).json({ name, email, website, headline, token });
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
};

const loginStudent = async (req, res) => {
	const { email, password } = req.body;

	const student = await Student.findStudentByCredentials(email, password);

	console.log(student);

	const token = student.generateAuthToken();

	res.status(200).json({ student, token });
};

export { getAllStudentProfile, createStudent, loginStudent };
