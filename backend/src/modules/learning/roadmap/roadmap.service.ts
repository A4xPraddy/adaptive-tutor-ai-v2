import { prisma } from "../../../lib/prisma.js";
import { generateRoadmap } from "../../ai/roadmap.generator.js";
import { getGoalById } from "../goals/goals.repository.js";
import {
  createRoadmap,
  createRoadmapModules,
  getRoadmapByGoalId,
} from "./roadmap.repository.js";

export const getRoadmapService = async (goalId: string) => {
  return getRoadmapByGoalId(goalId);
};

export const generateRoadmapService = async (goalId: string) => {
  const goal = await getGoalById(goalId);

  if (!goal) {
    throw new Error("Goal not found");
  }

  const existingRoadmap = await getRoadmapByGoalId(goalId);

  if (existingRoadmap) {
    return existingRoadmap;
  }

  const modules = await generateRoadmap(
    goal.title,
    goal.experienceLevel
  );

  return prisma.$transaction(async (tx) => {
    const roadmap = await createRoadmap(
      tx,
      goal.id,
      goal.title,
      goal.description ?? undefined
    );

    await createRoadmapModules(tx, roadmap.id, modules);

    return getRoadmapByGoalId(goal.id);
  });
};