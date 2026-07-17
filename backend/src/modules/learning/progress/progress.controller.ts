import { NextFunction, Response } from "express";
import { sendResponse } from "../../../shared/utils/response.js";
import { AuthRequest } from "../../auth/auth.middleware.js";
import {
  completeProgressService,
  continueLearningService,
  getGoalProgressService,
  startProgressService,
} from "./progress.service.js";

export const startProgressController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const progress = await startProgressService(
      req.user!.id,
      req.params.moduleId as string
    );

    return sendResponse(
      res,
      201,
      "Progress started successfully",
      progress
    );
  } catch (error) {
    next(error);
  }
};

export const completeProgressController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const progress = await completeProgressService(
      req.user!.id,
      req.params.moduleId as string
    );

    return sendResponse(
      res,
      200,
      "Module completed successfully",
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
      "Progress fetched successfully",
      progress
    );
  } catch (error) {
    next(error);
  }
};

export const continueLearningController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const module = await continueLearningService(
      req.user!.id,
      req.params.goalId as string
    );

    return sendResponse(
      res,
      200,
      "Continue learning module fetched successfully",
      module
    );
  } catch (error) {
    next(error);
  }
};