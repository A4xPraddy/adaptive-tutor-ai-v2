import { getQuizAttemptWithContext } from "./adaptive.repository.js";

export const analyzeQuizAttemptService = async (attemptId: string) => {
  const attempt = await getQuizAttemptWithContext(attemptId);

  if (!attempt) {
    throw new Error("Quiz attempt not found.");
  }

  let action = "";
  let reason = "";

  if (attempt.percentage >= 80) {
    action = "ADVANCE";
    reason = "Excellent performance.";
  } else if (attempt.percentage >= 50) {
    action = "CONTINUE";
    reason = "Good performance. Continue practicing.";
  } else {
    action = "REVISION";
    reason = "Revise the previous lesson before moving ahead.";
  }

  return {
    action,
    reason,
    percentage: attempt.percentage,
  };
};