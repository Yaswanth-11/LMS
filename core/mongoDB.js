import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectToMongoDB = async () => {
  try {
    const result = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/techspark"
    );

    logger.info("MongoDB connected successfully");
    return result;
  } catch (err) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    throw err;
  }
};
