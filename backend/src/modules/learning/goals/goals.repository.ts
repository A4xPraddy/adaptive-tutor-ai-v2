import { prisma } from "../../../lib/prisma.js";
import { CreateGoalInput } from "./goals.schema.js";

export const createGoal = async (
  tx: typeof prisma,
  userId: string,
  data: CreateGoalInput
) => {
  return tx.goal.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getGoalsByUserId = async (userId: string) => {
  return prisma.goal.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};