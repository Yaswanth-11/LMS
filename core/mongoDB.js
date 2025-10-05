import mongoose from "mongoose";
import logger from "../utils/logger.js";
import config from "../config/index.js";

export const connectToMongoDB = async () => {
  try {
    const result = await mongoose.connect(
      config.db.uri || "mongodb://127.0.0.1:27017/techspark"
    );

    logger.info("MongoDB connected successfully");
    return result;
  } catch (err) {
    logger.error(`MongoDB connection failed: ${err.message}`);
    throw err;
  }
};
