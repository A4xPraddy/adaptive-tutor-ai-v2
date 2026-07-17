import { Router } from "express";
import { protectRoute } from "../../auth/auth.middleware.js";
import {
  generateLessonController,
  regenerateLessonController,
  getLessonController,
} from "./lesson.controller.js";

const router = Router();

router.post(
  "/generate/:moduleId",
  protectRoute,
  generateLessonController
);

router.post(
  "/regenerate/:moduleId",
  protectRoute,
  regenerateLessonController
);

router.get(
  "/:moduleId",
  protectRoute,
  getLessonController
);

export default router;