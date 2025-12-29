import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // User exists already
    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
      loggedIn: false,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, email: user.email, username: user.username },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (!userExists) {
      return res
        .status(400)
        .json({ message: "User does not exist, please sign up or register" });
    }
    const isMatch = await userExists.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    res.status(200).json({
      message: "User Logged In",
      user: {
        id: userExists._id,
        username: userExists.username,
        email: userExists.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }
    return res.status(200).json({
      message: "Logout Successfull",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export { registerUser, loginUser, logoutUser };
