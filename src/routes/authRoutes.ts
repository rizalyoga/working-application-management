import express from "express";
import {
  register,
  login,
  logout,
  refreshToken,
} from "../controllers/authController";
import {
  validateRegister,
  validateLogin,
  validateRefreshToken,
} from "../middleware/authValidator";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Register route
router.post("/register", validateRegister, register);

// Login route
router.post("/login", validateLogin, login);

// Logout route (requires authentication)
router.post("/logout", authenticate, logout);

// Refresh token route
router.post("/refresh-token", validateRefreshToken, refreshToken);

export default router;
