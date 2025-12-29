import { Router } from "express";
import { createPost } from "../controllers/posts.controller.js";

const router = Router();

router.route("/create").post(createPost);

export default router;
