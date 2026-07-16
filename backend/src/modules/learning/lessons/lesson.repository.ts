import { Prisma } from "@prisma/client";
import { prisma } from "../../../lib/prisma.js";

export const createLesson = async (
  tx: Prisma.TransactionClient,
  moduleId: string,
  title: string,
  content: string
) => {
  return tx.lesson.create({
    data: {
      moduleId,
      title,
      content,
    },
  });
};

export const getLessonByModuleId = async (
  moduleId: string
) => {
  return prisma.lesson.findUnique({
    where: {
      moduleId,
    },
  });
};