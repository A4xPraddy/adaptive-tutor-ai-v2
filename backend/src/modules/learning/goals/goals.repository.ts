import { prisma } from "../../../lib/prisma.js";
import { CreateGoalInput } from "./goals.schema.js";
import { Prisma } from "@prisma/client";

export const createGoal = async (
  tx: Prisma.TransactionClient,
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

export const getGoalById = async (goalId: string) => {
  return prisma.goal.findUnique({
    where: {
      id: goalId,
    },
  });
};