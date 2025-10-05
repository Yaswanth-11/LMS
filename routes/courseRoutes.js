import { Router } from "express";
import { courseController } from "../controllers/courses.js";

export const router = Router();

router.route("/createCourse").post(courseController);
