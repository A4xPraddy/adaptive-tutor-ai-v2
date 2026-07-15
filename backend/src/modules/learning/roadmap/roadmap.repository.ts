import { prisma } from "../../../lib/prisma.js";

export const createRoadmaps = async (
  tx: typeof prisma,
  goalId: string,
  roadmaps: string[]
) => {
  return tx.roadmap.createMany({
    data: roadmaps.map((title, index) => ({
      title,
      order: index + 1,
      goalId,
    })),
  });
};

export const getRoadmapsByGoalId = async (
  goalId: string
) => {
  return prisma.roadmap.findMany({
    where: {
      goalId,
    },
    orderBy: {
      order: "asc",
    },
  });
};