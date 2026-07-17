import { Router } from "express";
import { protectRoute } from "../../auth/auth.middleware.js";
import {
  completeProgressController,
  continueLearningController,
  getGoalProgressController,
  startProgressController,
} from "./progress.controller.js";

const router = Router();

router.post(
  "/start/:moduleId",
  protectRoute,
  startProgressController
);

router.post(
  "/complete/:moduleId",
  protectRoute,
  completeProgressController
);

router.get(
  "/:goalId",
  protectRoute,
  getGoalProgressController
);

router.get(
  "/continue/:goalId",
  protectRoute,
  continueLearningController
);

export default router;