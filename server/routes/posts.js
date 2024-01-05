import express from "express";

import { authenticateUserToken } from "../middlewares/autenticateUserToken.js";
import {
	createPost,
	getFeedPosts,
	getUserPosts,
	likePost,
} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", authenticateUserToken, getFeedPosts);
router.get("/:userId/posts", authenticateUserToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", authenticateUserToken, likePost);

/* CREATE */
router.post("/", authenticateUserToken, createPost);

export default router;
