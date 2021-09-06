import mongoose from "mongoose";
import Student from "../models/Student.js";

const getStudentProfile = async (req, res) => {};

const createStudent = async (req, res) => {
	const { name, email, password, headline, website } = req.body;

	try {
		const isStudent = await Student.findOne(email);

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

		res.status(201).json({ student, token });
	} catch (error) {}
};

export { getStudentProfile, createStudent };
