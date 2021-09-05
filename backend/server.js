import express from "express";
import dotenv from "dotenv";

const PORT = 5000 || process.env.PORT;

dotenv.config();

const app = express();

app.get("/", (req, res) => {
	res.json({ message: "It's working again" });
});

app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`);
});
