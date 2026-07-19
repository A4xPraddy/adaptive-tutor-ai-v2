import { Router } from "express";
import { protectRoute } from "../../auth/auth.middleware.js";

import {
  completeLessonController,
  getRoadmapProgressController,
  getGoalProgressController,
} from "./progress.controller.js";

const router = Router();

/**
 * Mark lesson as completed
 * POST /api/v1/progress/complete/:lessonId
 */
router.post(
  "/complete/:lessonId",
  protectRoute,
  completeLessonController
);

/**
 * Get roadmap progress
 * GET /api/v1/progress/roadmap/:roadmapId
 */
router.get(
  "/roadmap/:roadmapId",
  protectRoute,
  getRoadmapProgressController
);

/**
 * Get goal progress
 * GET /api/v1/progress/goal/:goalId
 */
router.get(
  "/goal/:goalId",
  protectRoute,
  getGoalProgressController
);

export default router;