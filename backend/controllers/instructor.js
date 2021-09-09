import Instructor from "../models/Instructor.js";
import asyncHandler from "express-async-handler";

//@desc Get all instructors
//@route /instructors
//@access Private / for testing purposes
const getAllInstructors = asyncHandler(async (req, res) => {
	const instructors = await Instructor.find({});

	if (instructors.length === 0) {
		res.status(404);
		throw new Error("No instructors found");
	}

	res.status(200).json({ instructors });
});

//@desc Get Instructor profile
//@route /profile/instructor
//@access Private
const getInstructorProfile = asyncHandler(async (req, res) => {
	const instructor = await Instructor.findOne({ studentID: req.student._id });

	if (instructor) {
		res.status(200).json({ instructor });
	} else {
		res.status(404);
		throw new Error("Could not find instructor");
	}
});

export { getInstructorProfile, getAllInstructors };
