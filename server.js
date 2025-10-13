import app from "./app.js";
import logger from "./utils/logger.js";
import initServices from "./services/initialServices.js";
import config from "./config/index.js";

const PORT = config.port;

const startServer = async () => {
  try {
    logger.info("Initializing services...");
    await initServices();
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error(`Server startup failed: ${error.message}`, {
      stack: error.stack,
    });
    process.exit(1);
  }
};

startServer();
