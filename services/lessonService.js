import { LessonCollection } from "../models/Lesson.js";
import { ModuleCollection } from "../models/Module.js";

export const createLesson = async (data) => {
  const lesson = await LessonCollection.create(data);

  // Attach lesson to module
  await ModuleCollection.findByIdAndUpdate(lesson.module, {
    $push: { lessons: lesson._id },
  });

  return lesson;
};

export const getLessonsByModule = async (moduleId) => {
  return await LessonCollection.find({ module: moduleId }).lean();
};
