import { UserCollection as User } from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import config from "../config/index.js";

const register = async (name, email, password, role) => {
  let user = await User.findOne({ email });
  if (user) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    throw error;
  }

  user = new User({ name, email, password, role });
  await user.save();

  const token = jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
    expiresIn: "1h",
  });

  return { token };
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 400;
    throw error;
  }

  const token = jwt.sign({ id: user._id, role: user.role }, config.jwt.secret, {
    expiresIn: "1h",
  });

  return { token };
};

const generatePasswordReset = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: user.email,
    subject: "Password Reset Request",
    text: `To reset your password, click here: ${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
  };

  await transporter.sendMail(mailOptions);
  return { message: "Reset link sent to your email" };
};

const resetPassword = async (resetToken, newPassword) => {
  const user = await User.findOne({
    resetToken,
    resetTokenExpiration: { $gt: Date.now() },
  });

  if (!user) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 400;
    throw error;
  }

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiration = undefined;
  await user.save();

  return { message: "Password reset successfully" };
};

const refreshAuthToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("No refresh token provided");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(refreshToken, config.jwt.secret);
  const user = await User.findById(decoded.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400;
    throw error;
  }

  const newToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.secret,
    { expiresIn: "1h" }
  );

  return { token: newToken };
};

export const authService = {
  register,
  login,
  generatePasswordReset,
  resetPassword,
  refreshAuthToken,
};
