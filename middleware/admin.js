import { UserCollection } from "../models/User.js";

export const admin = async (req, res, next) => {
  try {
    const user = await UserCollection.findById(req.user.id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
