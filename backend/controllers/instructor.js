import Instructor from "../models/Instructor.js";
import asyncHandler from "express-async-handler";
import Student from "../models/Student.js";

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

// @desc Update Instructor Profile
//@route /profile/instructor/:id
//@access Private
const updateInstructorProfile = asyncHandler(async (req, res) => {
	const instructor = await Instructor.findById(req.params.id);
	const { profession, aboutMe } = req.body;

	if (!instructor) {
		res.status(404);
		throw new Error("Could not find instructor profile");
	}

	instructor.profession = profession;
	instructor.aboutMe = aboutMe;

	await instructor.save();
	res.status(200).json({ message: "Instructor Profile updated" });
});

//@desc Delete Instructor profile
//@route /profile/instructor/:id
//@access Private
const deleteInstructorProfile = asyncHandler(async (req, res) => {
	const instructor = await Instructor.findByIdAndRemove(req.params.id);

	const student = await Student.findById(req.student._id);

	if (!student) {
		res.status(404);
		throw new Error("Could not find student profile");
	}

	student.isInstructor = false;

	await student.save();
	if (instructor) {
		res.status(200).json({ instructor });
	} else {
		res.status(404);
		throw new Error("Could not find instructor");
	}
});

export {
	getInstructorProfile,
	getAllInstructors,
	deleteInstructorProfile,
	updateInstructorProfile,
};
