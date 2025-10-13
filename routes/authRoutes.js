import { Router } from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  refreshToken,
} from "../controllers/authController.js";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middleware/validate.js";
import { loginLimiter, passwordResetLimiter } from "../middleware/rateLimit.js";
import { authFunction } from "../middleware/auth.js";

const router = Router();

// Register a new user with validation
router.post("/register", validateUserRegistration, registerUser);

// User login with rate limiting and validation
router.post("/login", loginLimiter, validateUserLogin, loginUser);

// Forgot password with rate limiting
router.post("/forgot-password", passwordResetLimiter, forgotPassword);

// Reset password with rate limiting
router.post("/reset-password", passwordResetLimiter, resetPassword);

// Refresh token, requires a valid existing token
router.post("/refresh-token", authFunction, refreshToken);

export { router };
