import * as EnrollmentService from "../services/EnrollmentService.js";

export const enrollUser = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user._id; // from auth middleware
    const enrollment = await EnrollmentService.enrollUser(userId, courseId);
    res.status(201).json({ message: "Enrolled successfully", enrollment });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;
    const enrollment = await EnrollmentService.getEnrollment(userId, courseId);
    res.json(enrollment);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const updateLessonProgress = async (req, res) => {
  try {
    const { courseId, lessonId } = req.params;
    const { completed } = req.body;
    const userId = req.user._id;
    const updated = await EnrollmentService.updateLessonProgress(
      userId,
      courseId,
      lessonId,
      completed
    );
    res.json({ message: "Progress updated", enrollment: updated });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getUserEnrollments = async (req, res) => {
  try {
    const userId = req.user._id;
    const enrollments = await EnrollmentService.getUserEnrollments(userId);
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
