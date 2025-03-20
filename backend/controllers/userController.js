import User from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const {
      email,
      name,
      address,
      apartment,
      city,
      state,
      postalCode,
      productsPurchased,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      email,
      name,
      address,
      apartment,
      city,
      state,
      postalCode,
      productsPurchased,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).populate(
      "productsPurchased.productId"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Get new status from request

    // Ensure status is either "Pending" or "Delivered"
    if (!["Pending", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the user status in the database
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return updated user
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User status updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
