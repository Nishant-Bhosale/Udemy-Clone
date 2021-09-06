import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

const PORT = 5000 || process.env.PORT;

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
	res.json({ message: "It's working again" });
});

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
