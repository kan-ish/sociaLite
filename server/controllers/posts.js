import Post from "../db/models/Post.js";
import User from "../db/models/User.js";

export const createPost = async (req, res) => {
	try {
		const userId = req.user.id;
		const { description, picturePath } = req.body;
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
	try {
		const allPosts = Post.find();
		res.status(200).json({ allPosts });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserPosts = (req, res) => {
	try {
		const { userId } = req.params;
		const userPosts = Post.find({ userId });

		res.status(200).json({ userPosts });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const likePost = (req, res) => {
	return;
};
