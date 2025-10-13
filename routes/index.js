import { Router } from "express";
import { router as courseRoutes } from "./courseRoutes.js";
import { router as authRoutes } from "./authRoutes.js";

const router = Router();

// Attach specific routes under their respective paths

app.use("/api/courses", authMiddleware, courseRoutes);
router.use("/auth", authRoutes);
app.use("/api/lessons", authMiddleware, require("./routes/lessonRoutes"));
app.use(
  "/api/enrollments",
  authMiddleware,
  require("./routes/enrollmentRoutes")
);
app.use("/api/progress", authMiddleware, require("./routes/progressRoutes"));

export { router };
