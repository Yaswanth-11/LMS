import { Router } from "express";
import * as progressController from "../controllers/progressController.js";

export const router = Router();

// mark a lesson complete
router.post("/complete", progressController.markLessonComplete);

// get progress for a course (list of lessons with status)
router.get("/:courseId", progressController.getCourseProgress);
