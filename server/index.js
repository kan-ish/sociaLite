import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

/* App config */
app.use(express.json());
app.use(cors());

async function connectToMongoDB() {
	mongoose
		.connect(process.env.DB_URL)
		.then(() => console.log("Connected to MongoDB successfully"))
		.catch((err) => {
			console.log("MongoDB connection ERROR");
			console.error(err);
		});
}
connectToMongoDB();

/* Routes */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(process.env.APP_PORT, function () {
	console.log(`Server running on Port ${process.env.APP_PORT}`);
});
