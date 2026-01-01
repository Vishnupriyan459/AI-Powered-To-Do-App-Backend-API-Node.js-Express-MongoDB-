import User from "../models/User.js";
import bcrypt, { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
const { sign } = jwt;

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ fullName, email, password: hash });

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      message: "User created",
      token,
      user: { _id: user._id, fullName: user.fullName, email: user.email },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userDoc = await User.findOne({ email });
    if (!userDoc)
      return res.status(404).json({ message: "User not found" });

    const match = await compare(password, userDoc.password);
    if (!match)
      return res.status(401).json({ message: "Invalid password" });

    const token = sign({ id: userDoc._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      message: "Login successful",
      token,
      user: { _id: userDoc._id, fullName: userDoc.fullName, email: userDoc.email }
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
