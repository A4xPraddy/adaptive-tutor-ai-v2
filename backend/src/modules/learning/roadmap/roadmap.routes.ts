import { Router } from "express";
import { protectRoute } from "../../auth/auth.middleware.js";
import { getRoadmapController } from "./roadmap.controller.js";

const router = Router();

router.get(
  "/:goalId",
  protectRoute,
  getRoadmapController
);

export default router;