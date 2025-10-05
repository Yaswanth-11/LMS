import logger from "../utils/logger.js";
import { nodeRedisDemo } from "../core/redis.js";
import { connectToMongoDB } from "../core/mongoDB.js";

// Initialize Redis and Blockchain contract
let redisObj;
let mongoResult;

const initServices = async () => {
  try {
    // Initialize Redis
    logger.info("Initializing Redis...");

    redisObj = await nodeRedisDemo();

    mongoResult = await connectToMongoDB();

    logger.info("All services initialized successfully.");
  } catch (error) {
    logger.error(`Error initializing services: ${error.message}`, {
      stack: error.stack,
    });
    throw error;
  }
};

export { redisObj };
export default initServices;
