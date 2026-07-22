import { Response, NextFunction } from "express";
import { AuthRequest } from "../../auth/auth.middleware.js";

import { tutorChatService } from "./tutor.service.js";
import { sendResponse } from "../../../shared/utils/response.js";
import { tutorChatSchema } from "./tutor.schema.js";

export const tutorChatController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = tutorChatSchema.parse(req.body);

    const response = await tutorChatService(
      body.lessonId,
      body.message
    );

    return sendResponse(
      res,
      200,
      "Tutor response generated successfully.",
      response
    );
  } catch (error) {
    next(error);
  }
};