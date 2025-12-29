import { Router } from "express";
import { createPost, getPosts } from "../controllers/posts.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/get-posts").get(getPosts);

export default router;
