import nodemailer from "nodemailer";
import config from "../config/index.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

export const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${config.frontendUrl}/verify-email?token=${token}`;
  const message = `
    <h2>Verify your email address</h2>
    <p>Please click the link below to verify your account:</p>
    <a href="${verifyUrl}">${verifyUrl}</a>
    <p>This link will expire in 24 hours.</p>
  `;

  await transporter.sendMail({
    from: config.mail.from,
    to,
    subject: "Verify Your Email",
    html: message,
  });
};

// ✅ New function for password reset
export const sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `${config.frontendUrl}/reset-password?token=${token}`;
  const message = `
    <h2>Reset your password</h2>
    <p>Click the link below to set a new password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
    <p>This link will expire in 30 minutes.</p>
  `;
  await transporter.sendMail({
    from: config.mail.from,
    to,
    subject: "Reset Your Password",
    html: message,
  });
};
