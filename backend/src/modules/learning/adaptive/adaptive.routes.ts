import { Router } from "express";

import { protectRoute } from "../../auth/auth.middleware.js";
import { analyzeQuizAttemptController } from "./adaptive.controller.js";

const router = Router();

router.post(
  "/analyze/:quizAttemptId",
  protectRoute,
  analyzeQuizAttemptController
);

export default router;