import { prisma } from "../../../lib/prisma.js";

export const getLessonById = async (lessonId: string) => {
  return prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      content: true,
    },
  });
};