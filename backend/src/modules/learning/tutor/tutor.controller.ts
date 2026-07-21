import { Request, Response, NextFunction } from "express";
import { tutorChatService } from "./tutor.service.js";
import { sendResponse } from "../../../shared/utils/response.js";
import { TUTOR_MESSAGES } from "./tutor.constant.js";

export const tutorChatController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await tutorChatService();

    return sendResponse(
      res,
      200,
      TUTOR_MESSAGES.CHAT_SUCCESS,
      response
    );
  } catch (error) {
    next(error);
  }
};