import { authService } from "../services/authService.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await authService.register(name, email, password, role);
  res.status(201).json(result);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.status(200).json(result);
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const result = await authService.generatePasswordReset(email);
  res.status(200).json(result);
};

export const resetPassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;
  const result = await authService.resetPassword(resetToken, newPassword);
  res.status(200).json(result);
};

export const refreshToken = async (req, res) => {
  const refreshToken = req.header("x-refresh-token");
  const result = await authService.refreshAuthToken(refreshToken);
  res.status(200).json(result);
};
