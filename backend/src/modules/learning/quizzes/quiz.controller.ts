import { Request, Response } from "express";
import {
  generateQuizService,
  getQuizService,
  startQuizAttemptService,
  submitQuizService,
} from "./quiz.service.js";
import { AuthRequest } from "../../auth/auth.middleware.js";

export const generateQuizController = async (
  req: Request,
  res: Response
) => {
  try {
    const { moduleId } = req.params;
    const { level } = req.body;

    const quiz = await generateQuizService(
      moduleId,
      level
    );

    return res.status(201).json({
      success: true,
      message: "Quiz generated successfully.",
      data: quiz,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getQuizController = async (
  req: Request,
  res: Response
) => {
  try {
    const { lessonId } = req.params;

    const quiz = await getQuizService(lessonId);

    return res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const startQuizAttemptController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { quizId } = req.params;

    const attempt = await startQuizAttemptService(
      req.user.id,
      quizId
    );

    return res.status(201).json({
      success: true,
      message: "Quiz attempt started.",
      data: attempt,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const submitQuizController = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const { attemptId } = req.params;
    const { answers } = req.body;

    const result = await submitQuizService(
      attemptId,
      answers
    );

    return res.status(200).json({
      success: true,
      message: "Quiz submitted successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};