import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

/* App config */
app.use(express.json());
app.use(cors());

/* Routes */
app.post("/auth/register", function (req, res) {
	console.log("received");
	res.send("received");
});

app.listen(process.env.APP_PORT, function () {
	console.log(`Server running on Port ${process.env.APP_PORT}`);
});
