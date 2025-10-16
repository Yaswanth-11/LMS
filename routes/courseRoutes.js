import express from "express";
import * as courseController from "../controllers/courseController.js";

export const router = express.Router();

router.post("/", courseController.createCourse);
router.get("/", courseController.getCourses);
