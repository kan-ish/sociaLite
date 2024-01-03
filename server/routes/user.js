import express from "express";
import { getUser } from "../controllers/user.js";
import { authenticateUserToken } from "../middlewares/autenticateUserToken.js";

const router = express.Router();

router.get("/:id", authenticateUserToken, getUser);

export default router;
