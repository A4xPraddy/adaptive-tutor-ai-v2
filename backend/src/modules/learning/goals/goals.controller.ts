import { Response, NextFunction } from "express";
import { AuthRequest } from "../../auth/auth.middleware.js";
import { createGoalSchema } from "./goals.schema.js";
import {
  createGoalService,
  getGoalsService,
} from "./goals.service.js";
import { GOAL_MESSAGES } from "./goals.constants.js";
import { sendResponse } from "../../../shared/utils/response.js";

export const createGoalController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createGoalSchema.parse(req.body);

    const goal = await createGoalService(
      req.user!.id,
      data
    );

    return sendResponse(
      res,
      201,
      GOAL_MESSAGES.GOAL_CREATED,
      goal
    );
  } catch (error) {
    next(error);
  }
};
export const getGoalsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const goals = await getGoalsService(req.user!.id);

    return sendResponse(
      res,
      200,
      "Goals fetched successfully",
      goals
    );
  } catch (error) {
    next(error);
  }
};