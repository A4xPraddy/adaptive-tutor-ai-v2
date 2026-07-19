import { Router } from "express";
import { protectRoute } from "../../auth/auth.middleware.js";
import {
  generateQuizController,
  getQuizController,
  startQuizAttemptController,
  submitQuizController,
} from "./quiz.controller.js";

const router = Router();

/**
 * Generate quiz for a module
 * POST /api/v1/quizzes/generate/:moduleId
 */
router.post(
  "/generate/:moduleId",
  protectRoute,
  generateQuizController
);

/**
 * Get quiz by lesson
 * GET /api/v1/quizzes/:lessonId
 */
router.get(
  "/:lessonId",
  protectRoute,
  getQuizController
);

/**
 * Start a quiz attempt
 * POST /api/v1/quizzes/attempt/:quizId
 */
router.post(
  "/attempt/:quizId",
  protectRoute,
  startQuizAttemptController
);
/**
 * Submit quiz attempt
 * POST /api/v1/quizzes/submit/:attemptId
 */
router.post(
  "/submit/:attemptId",
  protectRoute,
  submitQuizController
);
export default router;