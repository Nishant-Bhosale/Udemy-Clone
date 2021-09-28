//Helper functions
const findCourseInPurchasedCourses = (student, id) => {
	const res = student.coursesTaken.find((courseId) => {
		return courseId.toString() === id.toString();
	});
	return res;
};

const findReviewedCourses = (course, id) => {
	console.log(course);
	console.log(id);
	const res = course.courseReviews.find((review) => {
		return review.user.toString() === id.toString();
	});
	console.log(res);
	return res;
};

export { findCourseInPurchasedCourses, findReviewedCourses };
