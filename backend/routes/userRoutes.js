import express from "express";
import {
  registerUser,
  getUser,
  updateUser,
  getAllUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/:email", getUser);
router.put("/status/:id", updateUser);
router.get("/", getAllUsers);

export default router;
