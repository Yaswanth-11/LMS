import { ServiceResult } from "../dto/serviceResult.js";
import { ErrorService } from "../dto/errorDto.js";
import { courseHandler } from "../services/courseService.js";
import logger from "../utils/logger.js";

export const courseController = async (req, res) => {
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
