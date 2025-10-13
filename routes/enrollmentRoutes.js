import { Router } from "express";
import enrollmentController from "../controllers/enrollmentController.js";

export const router = Router();

// enroll in a course
router.post("/", enrollmentController.enroll);

// list all courses of user
router.get("/my-courses", enrollmentController.getMyCourses);

export { router };
