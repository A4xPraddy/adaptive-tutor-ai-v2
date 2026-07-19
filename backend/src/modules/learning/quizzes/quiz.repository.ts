import { Prisma, QuizAttemptStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma.js";
import { GeneratedQuizQuestion } from "../../ai/quiz.generator.js";

export const createQuiz = async (
  data: {
    lessonId: string;
    title: string;
  },
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quiz.create({
    data,
  });
};

export const createQuizQuestions = async (
  quizId: string,
  questions: GeneratedQuizQuestion[],
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quizQuestion.createMany({
    data: questions.map((question) => ({
      quizId,
      question: question.question,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      order: question.order,
    })),
  });
};

export const getQuizByLessonId = async (
  lessonId: string,
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quiz.findUnique({
    where: {
      lessonId,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const getQuizById = async (
  quizId: string,
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};

export const createQuizAttempt = async (
  data: {
    userId: string;
    quizId: string;
  },
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quizAttempt.create({
   data: {
  ...data,
  score: 0,
  totalQuestions: 0,
  correctAnswers: 0,
  percentage: 0,
  status: QuizAttemptStatus.IN_PROGRESS,
},
  });
};

export const updateQuizAttempt = async (
  attemptId: string,
data: {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  status: QuizAttemptStatus;
},
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quizAttempt.update({
    where: {
      id: attemptId,
    },
    data,
  });
};

export const getQuizAttemptById = async (
  attemptId: string,
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quizAttempt.findUnique({
    where: {
      id: attemptId,
    },
    include: {
      quiz: {
        include: {
          questions: {
            orderBy: {
              order: "asc",
            },
          },
        },
      },
    },
  });
};

export const getUserQuizAttempts = async (
  userId: string,
  quizId: string,
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quizAttempt.findMany({
    where: {
      userId,
      quizId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const createQuizAnswers = async (
  answers: {
    attemptId: string;
    questionId: string;
    selectedAnswer: string;
    isCorrect: boolean;
  }[],
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quizAnswer.createMany({
    data: answers,
  });
};

export const getQuizWithQuestions = async (
  quizId: string,
  tx: Prisma.TransactionClient = prisma
) => {
  return tx.quiz.findUnique({
    where: {
      id: quizId,
    },
    include: {
      questions: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
};