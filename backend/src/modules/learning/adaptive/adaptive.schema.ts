import { z } from "zod";

export const analyzeQuizSchema = z.object({
  quizAttemptId: z.string().uuid(),
});