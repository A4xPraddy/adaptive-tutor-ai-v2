import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/response.js";
import {
  generateLessonService,
  getLessonService,
  regenerateLessonService,
} from "./lesson.service.js";

export const generateLessonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lesson = await generateLessonService(
      req.params.moduleId as string
    );

    return sendResponse(
      res,
      201,
      "Lesson generated successfully",
      lesson
    );
  } catch (error) {
    next(error);
  }
};

export const getLessonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lesson = await getLessonService(
      req.params.moduleId as string
    );

    return sendResponse(
      res,
      200,
      "Lesson fetched successfully",
      lesson
    );
  } catch (error) {
    next(error);
  }
};

export const regenerateLessonController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const lesson =
      await regenerateLessonService(
        req.params.moduleId as string
      );

    return sendResponse(
      res,
      200,
      "Lesson regenerated successfully",
      lesson
    );
  } catch (error) {
    next(error);
  }
};