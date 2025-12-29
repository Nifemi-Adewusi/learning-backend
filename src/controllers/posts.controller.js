import { Post } from "../models/post.model.js";

// Create Post
const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || !age) {
      return res
        .status(400)
        .json({ message: "Please Provide Name, Description And Age" });
    }

    const post = await Post.create({
      name,
      description,
      age,
    });

    res.status(201).json({
      message: "Post Created Successfully",
      post: {
        id: post._id,
        description: post.description,
        name: post.name,
        age: post.age,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed To Create Post" });
  }
};

const getPosts = async (_, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed To Create Post" });
  }
};
export { createPost, getPosts };
