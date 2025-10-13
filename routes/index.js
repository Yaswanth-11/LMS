import { Router } from "express";
import { router as courseRoutes } from "./courseRoutes.js";
import { router as authRoutes } from "./authRoutes.js";
import { router as lessonRoutes } from "./lessonRoutes.js";
import { router as enrollmentRoutes } from "./enrollmentRoutes.js";
import { router as progressRoutes } from "./progressRoutes.js";
import { authFunction } from "../middleware/auth.js";

const router = Router();

// Public routes
router.use("/auth", authRoutes);

// Protected routes
router.use("/courses", authFunction, courseRoutes);
router.use("/lessons", authFunction, lessonRoutes);
router.use("/enrollments", authFunction, enrollmentRoutes);
router.use("/progress", authFunction, progressRoutes);

export { router };
