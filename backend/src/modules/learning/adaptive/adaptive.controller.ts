import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/response.js";

import { analyzeQuizAttemptService } from "./adaptive.service.js";
import { ADAPTIVE_MESSAGES } from "./adaptive.constants.js";

export const analyzeQuizAttemptController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const recommendation = await analyzeQuizAttemptService(
      req.params.quizAttemptId as string
    );

    return sendResponse(
      res,
      200,
      ADAPTIVE_MESSAGES.ANALYSIS_SUCCESS,
      recommendation
    );
  } catch (error) {
    next(error);
  }
};