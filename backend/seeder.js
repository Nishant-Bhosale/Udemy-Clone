import Student from "./models/Student.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import Instructor from "./models/Instructor.js";
import Course from "./models/Course.js";

dotenv.config();

connectDB();

const destroyData = async () => {
	try {
		await Student.deleteMany();
		await Course.deleteMany();
		await Instructor.deleteMany();
		console.log("DELETED");
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

destroyData();
