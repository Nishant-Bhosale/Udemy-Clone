const express = require("express");

const PORT = 5000 || process.env.PORT;
const app = express();

app.get("/", (req, res) => {
	res.json({ message: "It's working again" });
});

app.listen(PORT, () => {
	console.log(`App is running on ${PORT}`);
});
