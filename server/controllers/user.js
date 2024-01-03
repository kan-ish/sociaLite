import User from "../db/models/User.js";

/* READ */
export const getUser = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		res.json({ user });
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};

export const getUserFriends = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);

		const friends = await Promise.all(
			user.friends.map((id) => User.findById(id))
		);

		const condensedFriends = friends.map(
			({ _id, firstName, lastName, occupation, location, picturePath }) => {
				return { _id, firstName, lastName, occupation, location, picturePath };
			}
		);

		res.json(condensedFriends);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
};
