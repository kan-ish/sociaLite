import User from "../db/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/* REGISTER */
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
		res.status(201).json({ user: savedUser });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};

/* LOGIN */
export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email: email });

		if (!user)
			return res.status(400).json({ message: "User does not exist." });

		const isMatch = bcrypt.compare(password, user.password);

		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials." });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

		const userWithoutPassword = user.toObject();
		delete userWithoutPassword.password;

		res.status(200).json({ token, user: userWithoutPassword });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: err.message });
	}
};
