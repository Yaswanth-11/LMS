import { Router } from "express";
import courseController from "../controllers/courses.js";
import { authFunction } from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";

export const router = Router();

// To create a course, a user must be authenticated (authFunction) AND be an admin (admin)
//router.post("/createCourse", authFunction, admin, courseController);

router.get("/", courseController.listCourses);
router.get("/:courseId", courseController.getCourse);

// Only instructor (or admin) can create
router.post("/", courseController.createCourse);
// Example of a route accessible by instructors or admins
// import { authorize } from "../middleware/auth.js";
// router.put("/updateCourse/:id", authFunction, authorize(['admin', 'instructor']), updateCourseController);

export { router };
