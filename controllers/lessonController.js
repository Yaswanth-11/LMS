import * as lessonService from "../services/lessonService.js";

export const createLesson = async (req, res) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLessonsByModule = async (req, res) => {
  try {
    const lessons = await lessonService.getLessonsByModule(req.params.moduleId);
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
