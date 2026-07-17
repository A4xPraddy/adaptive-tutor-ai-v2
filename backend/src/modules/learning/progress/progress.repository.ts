import { Prisma, ProgressStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma.js";

export const getProgressByUserAndModule = async (
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

export const startProgress = async (
  tx: Prisma.TransactionClient,
  userId: string,
  moduleId: string
) => {
  return tx.progress.create({
    data: {
      userId,
      moduleId,
      status: ProgressStatus.IN_PROGRESS,
    },
  });
};

export const completeProgress = async (
  tx: Prisma.TransactionClient,
  progressId: string
) => {
  return tx.progress.update({
    where: {
      id: progressId,
    },
    data: {
      status: ProgressStatus.COMPLETED,
      completedAt: new Date(),
    },
  });
};

export const getGoalProgress = async (
  userId: string,
  goalId: string
) => {
  return prisma.roadmap.findFirst({
    where: {
      goalId,
    },
    include: {
      modules: {
        orderBy: {
          order: "asc",
        },
        include: {
          progress: {
            where: {
              userId,
            },
          },
        },
      },
    },
  });
};

export const getContinueLearningModule = async (
  userId: string,
  goalId: string
) => {
  const roadmap = await prisma.roadmap.findFirst({
    where: {
      goalId,
    },
    include: {
      modules: {
        orderBy: {
          order: "asc",
        },
        include: {
          progress: {
            where: {
              userId,
            },
          },
        },
      },
    },
  });

  if (!roadmap) {
    return null;
  }

  return (
    roadmap.modules.find(
      (module) =>
        module.progress.length === 0 ||
        module.progress[0].status !== ProgressStatus.COMPLETED
    ) ?? null
  );
};