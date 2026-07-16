import { Router } from "express";
import { protectRoute } from "../../auth/auth.middleware.js";
import {
  generateRoadmapController,
  getRoadmapController,
} from "./roadmap.controller.js";

const router = Router();

router.post(
  "/generate/:goalId",
  protectRoute,
  generateRoadmapController
);

router.get(
  "/:goalId",
  protectRoute,
  getRoadmapController
);

export default router;