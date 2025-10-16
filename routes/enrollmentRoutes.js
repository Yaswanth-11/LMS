import express from "express";
import {
  enrollUser,
  getEnrollment,
  updateLessonProgress,
  getUserEnrollments,
} from "../controllers/enrollmentController.js";

export const router = express.Router();

// POST /api/enrollments
router.post("/", enrollUser);

// GET /api/enrollments/my
router.get("/my", getUserEnrollments);

// GET /api/enrollments/:courseId
router.get("/:courseId", getEnrollment);

// PATCH /api/enrollments/:courseId/lessons/:lessonId
router.patch("/:courseId/lessons/:lessonId", updateLessonProgress);
