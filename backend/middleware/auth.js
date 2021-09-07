import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

const authMiddleware = async (req, res, next) => {
	const token = req.header("x-auth-token");

	try {
		const decodedStudent = await jwt.verify(token, process.env.SECRET_KEY);

		const student = await Student.findOne({
			_id: decodedStudent._id,
			"tokens.token": token,
		});

		if (!student) {
			throw new Error();
		}

		req.token = token;
		req.student = student;
		next();
	} catch (error) {
		console.log(error);
		res.status(500).send({ error: "User not found" });
	}
};

export default authMiddleware;
