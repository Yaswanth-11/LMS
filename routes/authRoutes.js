import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  refreshToken,
  logoutUser,
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

router.get("/verify-email", verifyEmail);

// Forgot password with rate limiting
router.post("/forgot-password", passwordResetLimiter, forgotPassword);

// Reset password with rate limiting
router.post("/reset-password", passwordResetLimiter, resetPassword);

// Refresh token, requires a valid existing token
router.post("/refresh-token", authFunction, refreshToken);

router.post("/logout", authFunction, logoutUser);

export { router };
