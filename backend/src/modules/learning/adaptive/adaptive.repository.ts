import { prisma } from "../../../lib/prisma.js";

export const getQuizAttemptWithContext = async (attemptId: string) => {
  return prisma.quizAttempt.findUnique({
    where: {
      id: attemptId,
    },
    include: {
      quiz: {
        include: {
          lesson: {
            include: {
              module: {
                include: {
                  roadmap: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });
};