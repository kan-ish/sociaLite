import dotenv from "dotenv";

import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { locations, arbitraryString, sampleImages } from "./seedHelpers.js";

dotenv.config();

/* CONFIRM THIS BEFORE RUNNING THE SCRIPT */
const DeletePreviousPosts = true;
const randomCommentMaxCharLength = 50; // Below 100 advisable
const numOfRandomPosts = 50;

async function connectToDB() {
	mongoose
		.connect(process.env.DB_URL)
		.then(() => console.log("Connected to MongoDB successfully"))
		.catch((err) => {
			console.log("MongoDB connection ERROR");
			console.error(err);
		});
}
connectToDB();

const allUsers = await User.find();

/* function to grab a random item from an array */
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDBwithPosts = async (
	DeletePreviousPosts,
	randomCommentMaxCharLength,
	numOfRandomPosts
) => {
	if (DeletePreviousPosts) {
		await Post.deleteMany({});
		console.log("All existing posts deleted");
	}

	const allUsers = await User.find();

	const randomLikes = () => {
		const likes = new Map();

		for (
			let i = 0;
			i < Math.floor(Math.random() * (allUsers.length - 1));
			i++
		) {
			likes.set(allUsers[i]._id, true);
		}

		return likes;
	};

	const randomComments = () => {
		const comments = [];

		for (
			let i = 0;
			i < Math.floor(Math.random() * (allUsers.length - 1));
			i++
		) {
			comments.push(
				arbitraryString.slice(
					0,
					Math.floor(Math.random() * randomCommentMaxCharLength)
				)
			);
		}

		return comments;
	};

	for (let i = 0; i < numOfRandomPosts; i++) {
		const user = sample(allUsers);

		const randomPost = new Post({
			userId: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			location: sample(locations),
			description: arbitraryString.slice(
				0,
				Math.floor(Math.random() * arbitraryString.length)
			),
			picturePath: sample(sampleImages),
			userPicturePath: user.picturePath,
			likes: randomLikes(),
			comments: randomComments(),
		});

		await randomPost.save();
	}
};

seedDBwithPosts(
	DeletePreviousPosts,
	randomCommentMaxCharLength,
	numOfRandomPosts
)
	.then(() => {
		console.log("DB seeded successfully");
		mongoose.connection.close();
	})
	.catch((err) => console.error(err));
