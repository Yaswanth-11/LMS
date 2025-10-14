import { authService } from "../services/authService.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const result = await authService.register(name, email, password, role);
    res.status(201).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const result = await authService.verifyEmail(token);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { token } = req.body;
    const result = await authService.refreshAccessToken(token);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

// ✅ Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.status(200).json({ success: true, ...result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await authService.logout(req.user.id);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
