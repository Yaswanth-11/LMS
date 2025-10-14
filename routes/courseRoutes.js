import express from "express";
import * as courseController from "../controllers/courseController.js";

const router = express.Router();

router.post("/", courseController.createCourse);
router.get("/", courseController.getCourses);

export default router;
