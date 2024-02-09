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

		const capitalizedFirstName = `${firstName[0].toUpperCase()}${firstName.slice(1)}`
		const capitalizedLastName = `${lastName[0].toUpperCase()}${lastName.slice(1)}`
		const lowerCaseEmail = email.toLowerCase()
		const capitalizedLocation = `${location[0].toUpperCase()}${location.slice[1]}`

		const occupationWords = occupation.split(" ")
		let capitalizedOccupation = ""
		for (let word of occupationWords) {
			capitalizedOccupation += word[0].toUpperCase() + word.slice(1) + " "
		}
		capitalizedOccupation.trim()
		
		const salt = await bcrypt.genSalt();
		const pwdHash = await bcrypt.hash(password, salt);

		const newUser = new User({
			firstName: capitalizedFirstName,
			lastName: capitalizedLastName,
			password: pwdHash,
			email: lowerCaseEmail,
			picturePath,
			friends,
			location: capitalizedLocation,
			occupation: capitalizedOccupation,
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
		const user = await User.findOne({ email: email.toLowerCase() });

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
