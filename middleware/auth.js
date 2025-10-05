import jwt from "jsonwebtoken";

export const authorize = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export const authFunction = (req, res, next) => {
  // Get token from the Authorization header
  const authHeader = req.header("Authorization");

  // Check for token and ensure it's a Bearer token for better security
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token or incorrect format, authorization denied" });
  }

  try {
    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
