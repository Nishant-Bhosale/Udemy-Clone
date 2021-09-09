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

		if (!name) {
			return res.status(404).json({ message: "Name is required." });
		}

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

	if (!student) {
		return res.status(400).json({ error: "Email or password is incorrect." });
	}

	const token = student.generateAuthToken();

	res.status(200).json({ student, token });
};

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

const logoutStudentFromAllDevices = async (req, res) => {
	try {
		req.student.tokens = [];

		await req.student.save();
		res.status(200).send();
	} catch (error) {}
};

export { getAllStudentProfile, createStudent, loginStudent, logoutStudent };
