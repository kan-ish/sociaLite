import express from "express";
import { getUser, getUserFriends } from "../controllers/user.js";
import { authenticateUserToken } from "../middlewares/autenticateUserToken.js";

const router = express.Router();

/* READ */
router.get("/:id", authenticateUserToken, getUser);
router.get("/:id/friends", authenticateUserToken, getUserFriends);

export default router;
