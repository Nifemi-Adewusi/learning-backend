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

const updatePosts = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No Data Provided For Update" });
    }
    const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!posts) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    return res.status(200).json({
      message: "Post Updated Successfully",
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed To Update Post" });
  }
};
export { createPost, getPosts, updatePosts };
