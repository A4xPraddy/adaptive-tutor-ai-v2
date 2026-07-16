import { prisma } from "../../../lib/prisma.js";
import { Prisma } from "@prisma/client";

export const createRoadmap = async (
  tx: Prisma.TransactionClient,
  goalId: string,
  title: string,
  description?: string
) => {
  return tx.roadmap.create({
    data: {
      goalId,
      title,
      description,
    },
  });
};

export const createRoadmapModules = async (
  tx: Prisma.TransactionClient,
  roadmapId: string,
  modules: {
    title: string;
    description?: string;
    order: number;
  }[]
) => {
  return tx.roadmapModule.createMany({
    data: modules.map((module) => ({
      roadmapId,
      title: module.title,
      description: module.description,
      order: module.order,
    })),
  });
};

export const getRoadmapByGoalId = async (goalId: string) => {
  return prisma.roadmap.findFirst({
    where: {
      goalId,
    },
    include: {
      modules: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const getRoadmapById = async (roadmapId: string) => {
  return prisma.roadmap.findUnique({
    where: {
      id: roadmapId,
    },
    include: {
      modules: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const deleteRoadmap = async (
  tx: Prisma.TransactionClient,
  roadmapId: string
) => {
  return tx.roadmap.delete({
    where: {
      id: roadmapId,
    },
  });
};