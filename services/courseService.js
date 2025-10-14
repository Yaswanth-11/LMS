import { CourseCollection } from "../models/Course.js";

export const createCourse = async (data) => {
  const newCourse = new CourseCollection(data);
  return await newCourse.save();
};

export const getAllCourses = async () => {
  return await CourseCollection.find({ isArchived: false })
    .populate("modules")
    .lean();
};
