import { ModuleCollection } from "../models/Module.js";
import { CourseCollection } from "../models/Course.js";

export const createModule = async (data) => {
  const module = await ModuleCollection.create(data);

  // Push module reference to its course
  await CourseCollection.findByIdAndUpdate(module.course, {
    $push: { modules: module._id },
  });

  return module;
};

export const getModulesByCourse = async (courseId) => {
  return await ModuleCollection.find({ course: courseId })
    .populate("lessons")
    .lean();
};
