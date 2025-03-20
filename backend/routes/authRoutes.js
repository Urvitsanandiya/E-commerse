import express from "express";
import {
  registerAuth,
  loginAuth,
  logoutAuth,
  getCurrentAuth,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerAuth);
router.post("/login", loginAuth);
router.post("/logout", logoutAuth);
router.get("/me", getCurrentAuth);

export default router;
