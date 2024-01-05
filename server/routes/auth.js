import express from "express";

import { login, register } from "../controllers/auth.js";
import upload from "../middlewares/multerImageUpload.js";

const router = express.Router();

router.post("/register", upload.single("image"), register);
router.post("/login", login);

export default router;
