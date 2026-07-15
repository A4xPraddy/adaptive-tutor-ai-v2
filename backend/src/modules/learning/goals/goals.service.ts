import { prisma } from "../../../lib/prisma.js";

import {
  createGoal,
  getGoalsByUserId,
} from "./goals.repository.js";

import { CreateGoalInput } from "./goals.schema.js";

import { generateRoadmap } from "../roadmap/roadmap.generator.js";

import { createRoadmaps } from "../roadmap/roadmap.repository.js";

export const createGoalService = async (
  userId: string,
  data: CreateGoalInput
) => {
  return prisma.$transaction(async (tx) => {
    // 1. Create Goal
    const goal = await createGoal(tx, userId, data);

    // 2. Generate Roadmap
    const roadmap = generateRoadmap(goal.title);

    // 3. Save Roadmap
    await createRoadmaps(tx, goal.id, roadmap);

    return goal;
  });
};

export const getGoalsService = async (
  userId: string
) => {
  return getGoalsByUserId(userId);
};