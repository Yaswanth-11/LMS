import { Router } from "express";
import {
  createLesson,
  getLessonsByModule,
} from "../controllers/lessonController.js";

export const router = Router();

router.post("/:courseId", createLesson);
router.get("/:courseId", getLessonsByModule);
