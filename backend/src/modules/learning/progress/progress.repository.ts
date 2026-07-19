import { prisma } from "../../../lib/prisma.js";
import { ProgressStatus } from "@prisma/client";

export const findProgressByUserAndModule = async (
  userId: string,
  moduleId: string
) => {
  return prisma.progress.findUnique({
    where: {
      userId_moduleId: {
        userId,
        moduleId,
      },
    },
  });
};

export const createProgress = async (
  userId: string,
  moduleId: string
) => {
  return prisma.progress.create({
    data: {
      userId,
      moduleId,
      status: ProgressStatus.IN_PROGRESS,
    },
  });
};

export const completeProgress = async (progressId: string) => {
  return prisma.progress.update({
    where: {
      id: progressId,
    },
    data: {
      status: ProgressStatus.COMPLETED,
      completedAt: new Date(),
    },
  });
};

export const getModuleProgress = async (
  userId: string,
  moduleId: string
) => {
  return prisma.progress.findUnique({
    where: {
      userId_moduleId: {
        userId,
        moduleId,
      },
    },
  });
};

export const getRoadmapModules = async (roadmapId: string) => {
  return prisma.roadmapModule.findMany({
    where: {
      roadmapId,
    },
    select: {
      id: true,
    },
  });
};

export const getGoalRoadmaps = async (goalId: string) => {
  return prisma.roadmap.findMany({
    where: {
      goalId,
    },
    select: {
      id: true,
      modules: {
        select: {
          id: true,
        },
      },
    },
  });
};

export const countCompletedModules = async (
  userId: string,
  moduleIds: string[]
) => {
  return prisma.progress.count({
    where: {
      userId,
      moduleId: {
        in: moduleIds,
      },
      status: ProgressStatus.COMPLETED,
    },
  });
};