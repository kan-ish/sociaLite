import express from "express";
import upload from "../middlewares/multerImageUpload.js";

import { authenticateUserToken } from "../middlewares/autenticateUserToken.js";
import {
	createPost,
	getFeedPosts,
	getUserPosts,
	toggleLike,
} from "../controllers/posts.js";

const router = express.Router();

/* READ */
router.get("/", authenticateUserToken, getFeedPosts);
router.get("/:userId/posts", authenticateUserToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", authenticateUserToken, toggleLike);

/* CREATE */
router.post("/", authenticateUserToken, upload.single("image"), createPost);

export default router;
