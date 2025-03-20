import Auth from "../models/authUser.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Generate JWT Token
const generateToken = (auth) => {
  return jwt.sign({ id: auth._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Register Auth
export const registerAuth = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAuth = await Auth.findOne({ email });
    if (existingAuth) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAuth = new Auth({ name, email, password: hashedPassword });
    await newAuth.save();

    const token = generateToken(newAuth);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({ message: "User registered", auth: newAuth });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Auth
export const loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;

    const auth = await Auth.findOne({ email });
    if (!auth) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(auth);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Login successful", auth, token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Logout Auth
export const logoutAuth = (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(0), // Set expiration to the past to clear cookie
    })
    .json({ message: "Logged out successfully" });
};

// Get Current Auth
export const getCurrentAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const auth = await Auth.findById(decoded.id).select("-password");
    if (!auth) return res.status(401).json({ message: "Unauthorized" });

    res.json(auth);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
