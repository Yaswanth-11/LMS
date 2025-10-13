import { Router } from "express";
import lessonController from "../controllers/lessonControllerjs";

export const router = Router();

router.post("/:courseId", lessonController.addLessonToCourse);
router.get("/:courseId", lessonController.getLessonsOfCourse);

export { router };
