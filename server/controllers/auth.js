import User from "../db/models/User.js";
import bcrypt from "bcrypt";

/* REGISTER ROUTE */

export const register = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			password,
			picturePath,
			friends,
			location,
			occupation,
		} = req.body;

		const salt = await bcrypt.genSalt();
		const pwdHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName,
			lastName,
			password: pwdHash,
			email,
			picturePath,
			friends,
			location,
			occupation,
			viewedProfile: Math.floor(Math.random() * 10000),
			impressions: Math.floor(Math.random() * 10000),
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};
