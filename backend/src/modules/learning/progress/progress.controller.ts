import { Response, NextFunction } from "express";
import { AuthRequest } from "../../auth/auth.middleware.js";

import {
  completeLessonService,
  getRoadmapProgressService,
  getGoalProgressService,
} from "./progress.service.js";

import { sendResponse } from "../../../shared/utils/response.js";

export const completeLessonController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const progress = await completeLessonService(
      req.user!.id,
      req.params.lessonId as string
    );

    return sendResponse(
      res,
      200,
      "Lesson marked as completed.",
      progress
    );
  } catch (error) {
    next(error);
  }
};

export const getRoadmapProgressController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const progress = await getRoadmapProgressService(
      req.user!.id,
      req.params.roadmapId as string
    );

    return sendResponse(
      res,
      200,
      "Roadmap progress fetched successfully.",
      progress
    );
  } catch (error) {
    next(error);
  }
};

export const getGoalProgressController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const progress = await getGoalProgressService(
      req.user!.id,
      req.params.goalId as string
    );

    return sendResponse(
      res,
      200,
      "Goal progress fetched successfully.",
      progress
    );
  } catch (error) {
    next(error);
  }
};