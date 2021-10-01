//Helper functions
const findCourseInPurchasedCourses = (student, id) => {
	const res = student.coursesTaken.find((courseId) => {
		return courseId.toString() === id.toString();
	});
	return res;
};

const findCourseInWishListCourses = (student, id) => {
	const res = student.wishList.find((courseId) => {
		return courseId.toString() === id.toString();
	});
	return res;
};

const findReviewedCourses = (course, id) => {
	const res = course.courseReviews.find((review) => {
		return review.user.toString() === id.toString();
	});
	return res;
};

export {
	findCourseInPurchasedCourses,
	findReviewedCourses,
	findCourseInWishListCourses,
};
