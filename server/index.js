import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import postsRoutes from "./routes/posts.js";


const app = express();

/* App config */
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"))
app.use(express.static("public"))

async function connectToMongoDB() {
	try {
		await mongoose.connect(process.env.DB_URL);
		console.log("Connected to MongoDB successfully");
	} catch (err) {
		console.log("MongoDB connection ERROR");
		console.error(err);
	}
}
connectToMongoDB();

/* Routes */
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/posts", postsRoutes);

app.listen(process.env.APP_PORT, function () {
	console.log(`Server running on Port ${process.env.APP_PORT}`);
});
