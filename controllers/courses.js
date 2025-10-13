import { ServiceResult } from "../dto/serviceResult.js";
import { ErrorService } from "../dto/errorDto.js";
import { courseHandler } from "../services/courseService.js";
import logger from "../utils/logger.js";

const courseController = async (req, res) => {
  try {
    // Validate request body
    if (!req.body) {
      throw new Error("Invalid request body.");
    }
    const { seed } = req.body;

    logger.info("process initiated.");

    const courses = await courseHandler(seed);

    const responseDTO = new ServiceResult(
      true,
      "course created successfully.",
      0,
      "",
      courses
    );
    res.status(200).json(responseDTO);
  } catch (error) {
    new ErrorService(
      "courseController",
      "Error during course creation",
      error
    ).logError();

    const errorResponseDTO = new ServiceResult(
      false,
      "Internal Server Error. Failed to create course.",
      0,
      error.message,
      null
    );
    res.status(200).json(errorResponseDTO);
  }
};

// controllers/courseController.js
const Course = require("../models/Course");
// optionally Lesson if embedding or eager load

const listCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate("instructor", "name email");
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

const getCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate(
      "instructor",
      "name email"
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
};

const createCourse = async (req, res, next) => {
  try {
    // only instructors or admin allowed
    const user = req.user;
    if (user.role !== "instructor" && user.role !== "admin") {
      return res.status(403).json({ message: "Not permitted" });
    }
    const { title, description, category, tags, thumbnailUrl, price } =
      req.body;
    const course = await Course.create({
      title,
      description,
      instructor: user.userId, // assuming req.user has userId
      category,
      tags,
      thumbnailUrl,
      price,
    });
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};

export default {
  listCourses,
  getCourse,
  createCourse,
};
