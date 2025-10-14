import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { router as allRoutes } from "./routes/index.js";
import morganMiddleware from "./middlewares/morganMiddleware.js";
import { errorHandler } from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";

const app = express();

// Middleware setup
app.use(helmet());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(morganMiddleware);
app.use(cors());

// Routes
app.use("/api", allRoutes);

// Default route
app.get("/", (req, res) => {
  logger.info("Health check route accessed.");
  res.send("Welcome to the TechSpark courses documentation.");
});

// Error handler for uncaught routes
app.use((req, res) => {
  logger.warn(`404 - Route not found: ${req.originalUrl}`);
  res.status(404).send({ error: "Route not found" });
});

// Use the centralized error handler
app.use(errorHandler);

export default app;
