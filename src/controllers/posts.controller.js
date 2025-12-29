import { Post } from "../models/post.model.js";

// Create Post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;
    if (!name || !description || !age) {
      return res
        .status(400)
        .json({ message: "Please Provide Name, Description Or Age" });
    }

    const post = await Post.create(name, description, age);
    res.status(201).json({ message: "Post Created Sucessfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed To Create Post" });
  }
};
export { createPost };
