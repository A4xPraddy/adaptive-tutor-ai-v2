import { prisma } from "../../../lib/prisma.js";
import { ProgressStatus } from "@prisma/client";
import {
  completeProgress,
  getContinueLearningModule,
  getGoalProgress,
  getProgressByUserAndModule,
  startProgress,
} from "./progress.repository.js";

export const startProgressService = async (
  userId: string,
  moduleId: string
) => {
  const existingProgress = await getProgressByUserAndModule(
    userId,
    moduleId
  );

  if (existingProgress) {
    return existingProgress;
  }

  return prisma.$transaction(async (tx) => {
    return startProgress(tx, userId, moduleId);
  });
};

export const completeProgressService = async (
  userId: string,
  moduleId: string
) => {
  const progress = await getProgressByUserAndModule(
    userId,
    moduleId
  );

  if (!progress) {
    return prisma.$transaction(async (tx) => {
      const started = await startProgress(
        tx,
        userId,
        moduleId
      );

      return completeProgress(tx, started.id);
    });
  }

  if (progress.status === ProgressStatus.COMPLETED) {
    return progress;
  }

  return prisma.$transaction(async (tx) => {
    return completeProgress(tx, progress.id);
  });
};

export const getGoalProgressService = async (
  userId: string,
  goalId: string
) => {
  const roadmap = await getGoalProgress(userId, goalId);

  if (!roadmap) {
    throw new Error("Roadmap not found");
  }

  const totalModules = roadmap.modules.length;

  const completedModules = roadmap.modules.filter(
    (module) =>
      module.progress.length > 0 &&
      module.progress[0].status === ProgressStatus.COMPLETED
  ).length;

  const inProgressModules = roadmap.modules.filter(
    (module) =>
      module.progress.length > 0 &&
      module.progress[0].status === ProgressStatus.IN_PROGRESS
  ).length;

  const remainingModules =
    totalModules - completedModules - inProgressModules;

  const percentage =
    totalModules === 0
      ? 0
      : Number(
          (
            (completedModules / totalModules) *
            100
          ).toFixed(2)
        );

  return {
    roadmapId: roadmap.id,
    goalId,
    totalModules,
    completedModules,
    inProgressModules,
    remainingModules,
    percentage,
  };
};

export const continueLearningService = async (
  userId: string,
  goalId: string
) => {
  const module =
    await getContinueLearningModule(
      userId,
      goalId
    );

  if (!module) {
    return null;
  }

  return module;
};