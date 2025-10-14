import * as moduleService from "../services/moduleService.js";

export const createModule = async (req, res) => {
  try {
    const module = await moduleService.createModule(req.body);
    res.status(201).json(module);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getModulesByCourse = async (req, res) => {
  try {
    const modules = await moduleService.getModulesByCourse(req.params.courseId);
    res.json(modules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
