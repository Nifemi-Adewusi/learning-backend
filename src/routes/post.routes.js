import { Router } from "express";
import {
  createPost,
  getPosts,
  updatePosts,
} from "../controllers/posts.controller.js";

const router = Router();

router.route("/create").post(createPost);
router.route("/get-posts").get(getPosts);
router.route("/update/:id").patch(updatePosts);

export default router;
