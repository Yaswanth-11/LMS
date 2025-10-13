import { Lesson } from "../models/Lesson.js";
import { Course } from "../models/Course.js";

const addLessonToCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const user = req.user;

    // check whether the user is instructor for that course (authorization)
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (course.instructor.toString() !== user.userId && user.role !== "admin") {
      return res.status(403).json({ message: "Not permitted to add lessons" });
    }

    const { title, contentType, contentUrl, contentText, order, duration } =
      req.body;
    const lesson = await Lesson.create({
      course: courseId,
      title,
      contentType,
      contentUrl,
      contentText,
      order,
      duration,
    });
    res.status(201).json(lesson);
  } catch (err) {
    next(err);
  }
};

const getLessonsOfCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ course: courseId }).sort("order");
    res.json(lessons);
  } catch (err) {
    next(err);
  }
};

export default {
  addLessonToCourse,
  getLessonsOfCourse,
};
