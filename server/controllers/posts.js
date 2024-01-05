import Post from "../db/models/Post.js";
import User from "../db/models/User.js";

export const createPost = async (req, res) => {
	try {
		const { userId, description, picturePath } = req.body;
		const user = await User.findById(userId);

		const newPost = new Post({
			userId,
			firstName: user.firstName,
			lastName: user.lastName,
			location: user.location,
			description,
			picturePath,
			userPicturePath: user.picturePath,
		});

		await newPost.save();

		const allPosts = await Post.find();

		res.status(201).json({ allPosts });
	} catch (err) {
		res.status(409).json({ message: err.message });
	}
};

export const getFeedPosts = (req, res) => {
	return;
};

export const getUserPosts = (req, res) => {
	return;
};

export const likePost = (req, res) => {
	return;
};
