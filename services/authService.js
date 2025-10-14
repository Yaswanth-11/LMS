import { UserCollection as User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import config from "../config/index.js";

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.secret,
    { expiresIn: config.jwt.accessExpiresIn }
  );

  const refreshToken = jwt.sign({ id: user._id }, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });

  return { accessToken, refreshToken };
};

const register = async (name, email, password, role) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("User already exists");

  const user = await User.create({ name, email, password, role });

  // Generate email verification token
  const emailToken = jwt.sign({ id: user._id }, config.jwt.emailSecret, {
    expiresIn: config.jwt.emailTokenExpiresIn,
  });

  await sendVerificationEmail(email, emailToken);

  return {
    message: "User registered successfully. Please verify your email.",
  };

  // const { accessToken, refreshToken } = generateTokens(user);

  // user.refreshToken = refreshToken;
  // await user.save();

  // return {
  //   accessToken,
  //   refreshToken,
  //   user: { id: user._id, name, email, role },
  // };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }

  if (!user.isVerified)
    throw new Error("Please verify your email before logging in.");

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

  return {
    message: "Login successful",
    accessToken,
    refreshToken,
    user: { id: user._id, name: user.name, email, role: user.role },
  };
};

// ✅ VERIFY EMAIL
const verifyEmail = async (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.emailSecret);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("User not found");

    user.isVerified = true;
    await user.save();

    return { message: "Email verified successfully" };
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

const refreshAccessToken = async (token) => {
  if (!token) throw new Error("Refresh token required");

  try {
    const decoded = jwt.verify(token, config.jwt.refreshSecret);
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token)
      throw new Error("Invalid refresh token");

    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};

// 🧩 Forgot Password
const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("No user found with that email");

  const resetToken = jwt.sign({ id: user._id }, config.jwt.emailSecret, {
    expiresIn: config.jwt.passwordResetExpiresIn,
  });

  await sendPasswordResetEmail(email, resetToken);

  return { message: "Password reset email sent successfully." };
};

// 🔐 Reset Password
const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, config.jwt.emailSecret);
    const user = await User.findById(decoded.id);
    if (!user) throw new Error("Invalid or expired token");

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return { message: "Password reset successful. You can now log in." };
  } catch (err) {
    throw new Error("Invalid or expired reset token");
  }
};

export const authService = {
  register,
  login,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
};
