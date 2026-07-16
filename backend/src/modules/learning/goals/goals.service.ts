import { prisma } from "../../../lib/prisma.js";

import {
  createGoal,
  getGoalsByUserId,
} from "./goals.repository.js";

import { CreateGoalInput } from "./goals.schema.js";



export const createGoalService = async (
  userId: string,
  data: CreateGoalInput
) => {
  return prisma.$transaction(async (tx) => {
    const goal = await createGoal(tx, userId, data);
    return goal;
  });
};

export const getGoalsService = async (
  userId: string
) => {
  return getGoalsByUserId(userId);
};