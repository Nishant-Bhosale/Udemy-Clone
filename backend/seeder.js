import Student from "./models/Student.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

connectDB();

const destroyData = async () => {
	try {
		await Student.deleteMany();
		console.log("DELETED");
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

destroyData();
