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

/* UPDATE */
export const addOrRemoveFriend = async (req, res) => {
	try {
		const { id, friendId } = req.params;
		const user = await User.findById(id);
		const friend = await User.findById(friendId);

		if (user.friends.includes(friendId)) {
			user.friends = user.friends.filter((id) => id !== friendId);
			friend.friends = friend.friends.filter((uid) => uid !== id);
		} else {
			user.friends.push(friendId);
			friend.friends.push(id);
		}

		await user.save();
		await friend.save();

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
