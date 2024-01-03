import express from "express";
import {
	getUser,
	getUserFriends,
	addOrRemoveFriend,
} from "../controllers/user.js";
import { authenticateUserToken } from "../middlewares/autenticateUserToken.js";

const router = express.Router();

/* READ */
router.get("/:id", authenticateUserToken, getUser);
router.get("/:id/friends", authenticateUserToken, getUserFriends);

/* UPDATE */
router.patch("/:id/:friendId", authenticateUserToken, addOrRemoveFriend);

export default router;
