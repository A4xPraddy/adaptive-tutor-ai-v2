import { Router } from "express";
import {
  createGoalController,
  getGoalsController,
} from "./goals.controller.js";
import { protectRoute } from "../../auth/auth.middleware.js";

const router = Router();

// Create a new goal
router.post("/", protectRoute, createGoalController);

// Get all goals of logged-in user
router.get("/", protectRoute, getGoalsController);

export default router;