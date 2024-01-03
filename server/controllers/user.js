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
