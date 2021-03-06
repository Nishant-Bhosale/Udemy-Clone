import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './routes/auth.js';
import instructorRouter from './routes/instructor.js';
import courseRouter from './routes/course.js';
import studentRouter from './routes/student.js';
import reviewRouter from './routes/courseReviews.js';
import { errorMiddleware, notFound } from './middleware/errorMiddleware.js';

const PORT = 5000 || process.env.PORT;

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use(authRouter);
app.use(courseRouter);
app.use(instructorRouter);
app.use(studentRouter);
app.use(reviewRouter);

app.use(notFound);
app.use(errorMiddleware);

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
