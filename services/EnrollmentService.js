import { EnrollmentCollection } from "../models/Enrollment.js";
import { CourseCollection } from "../models/Course.js";
import { ModuleCollection } from "../models/Module.js";
import { LessonCollection } from "../models/Lesson.js";

export const enrollUser = async (userId, courseId) => {
  // Check if already enrolled
  const existing = await EnrollmentCollection.findOne({
    user: userId,
    course: courseId,
  });
  if (existing) throw new Error("User is already enrolled in this course.");

  // Fetch lessons count for accurate tracking
  const modules = await ModuleCollection.find({ course: courseId }).select(
    "_id"
  );
  const lessonsCount = await LessonCollection.countDocuments({
    module: { $in: modules.map((m) => m._id) },
  });

  const enrollment = await EnrollmentCollection.create({
    user: userId,
    course: courseId,
    totalLessonsCount: lessonsCount,
  });

  // Increment learners count in course
  await CourseCollection.findByIdAndUpdate(courseId, {
    $inc: { learnersCount: 1 },
  });

  return enrollment;
};

export const getEnrollment = async (userId, courseId) => {
  const enrollment = await EnrollmentCollection.findOne({
    user: userId,
    course: courseId,
  })
    .populate("course", "title category level")
    .populate({
      path: "progress.lesson",
      select: "title order contentType",
    })
    .lean();

  if (!enrollment) throw new Error("Enrollment not found for this course.");
  return enrollment;
};

export const updateLessonProgress = async (
  userId,
  courseId,
  lessonId,
  completed
) => {
  const enrollment = await EnrollmentCollection.findOne({
    user: userId,
    course: courseId,
  });
  if (!enrollment) throw new Error("User not enrolled in this course.");

  const existing = enrollment.progress.find(
    (p) => p.lesson.toString() === lessonId
  );

  if (existing) {
    existing.completed = completed;
    existing.completedAt = completed ? new Date() : null;
  } else {
    enrollment.progress.push({
      lesson: lessonId,
      completed,
      completedAt: completed ? new Date() : null,
    });
  }

  enrollment.completedLessonsCount = enrollment.progress.filter(
    (p) => p.completed
  ).length;

  if (enrollment.completedLessonsCount === enrollment.totalLessonsCount) {
    enrollment.status = "completed";
  }

  await enrollment.save();
  return enrollment;
};

export const getUserEnrollments = async (userId) => {
  return EnrollmentCollection.find({ user: userId })
    .populate("course", "title category level thumbnail")
    .lean();
};
