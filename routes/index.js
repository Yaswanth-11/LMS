import { Router } from "express";
import { router as courseRoutes } from "./courseRoutes.js";
import { router as authRoutes } from "./authRoutes.js";

const router = Router();

// Attach specific routes under their respective paths
router.use("/courses", courseRoutes);
router.use("/auth", authRoutes);

export { router };
