import { prisma } from "../../../lib/prisma.js";
import { getLessonByModuleId } from "../lessons/lesson.repository.js";
import {
  createQuiz,
  createQuizQuestions,
  createQuizAttempt,
  createQuizAnswers,
  getQuizByLessonId,
  getQuizById,
  getQuizAttemptById,
  getQuizWithQuestions,
  updateQuizAttempt,
} from "./quiz.repository.js";
import { generateQuiz } from "../../ai/quiz.generator.js";

export const generateQuizService = async (
  moduleId: string,
  level: string
) => {
  const lesson = await getLessonByModuleId(moduleId);

  if (!lesson) {
    throw new Error("Lesson not found.");
  }

  const existingQuiz = await getQuizByLessonId(lesson.id);

  if (existingQuiz) {
    return existingQuiz;
  }

  const generatedQuestions = await generateQuiz(
    lesson.title,
    level
  );

  return prisma.$transaction(async (tx) => {
    const quiz = await createQuiz(
      {
        lessonId: lesson.id,
        title: `${lesson.title} Quiz`,
      },
      tx
    );

    await createQuizQuestions(
      quiz.id,
      generatedQuestions,
      tx
    );

    return getQuizById(quiz.id, tx);
  });
};

export const getQuizService = async (
  lessonId: string
) => {
  const quiz = await getQuizByLessonId(lessonId);

  if (!quiz) {
    throw new Error("Quiz not found.");
  }

  return quiz;
};

export const startQuizAttemptService = async (
  userId: string,
  quizId: string
) => {
  const quiz = await getQuizById(quizId);

  if (!quiz) {
    throw new Error("Quiz not found.");
  }

  return createQuizAttempt(
    {
      userId,
      quizId,
    },
    prisma
  );
};

type SubmittedAnswer = {
  questionId: string;
  selectedAnswer: string;
};

export const submitQuizService = async (
  attemptId: string,
  answers: SubmittedAnswer[]
) => {
  const attempt = await getQuizAttemptById(attemptId);

  if (!attempt) {
    throw new Error("Quiz attempt not found.");
  }

  if (attempt.status !== "IN_PROGRESS") {
    throw new Error("Quiz already submitted.");
  }

  const quiz = await getQuizWithQuestions(attempt.quizId);

  if (!quiz) {
    throw new Error("Quiz not found.");
  }

  let correctAnswers = 0;

  const answersToSave = answers.map((answer) => {
    const question = quiz.questions.find(
      (q) => q.id === answer.questionId
    );

    if (!question) {
      throw new Error("Invalid question.");
    }

    const isCorrect =
      question.correctAnswer === answer.selectedAnswer;

    if (isCorrect) {
      correctAnswers++;
    }

    return {
      attemptId,
      questionId: answer.questionId,
      selectedAnswer: answer.selectedAnswer,
      isCorrect,
    };
  });

  const totalQuestions = quiz.questions.length;

  const percentage =
    totalQuestions === 0
      ? 0
      : (correctAnswers / totalQuestions) * 100;

  const score = correctAnswers;

  const status =
    percentage >= 70
      ? "PASSED"
      : "FAILED";

  return prisma.$transaction(async (tx) => {
    await createQuizAnswers(
      answersToSave,
      tx
    );

    await updateQuizAttempt(
      attemptId,
      {
        score,
        totalQuestions,
        correctAnswers,
        percentage,
        status,
      },
      tx
    );

    return getQuizAttemptById(
      attemptId,
      tx
    );
  });
};