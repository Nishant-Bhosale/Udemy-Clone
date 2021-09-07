import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import studentRouter from "./routes/auth.js";

const PORT = 5000 || process.env.PORT;

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use(studentRouter);

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
