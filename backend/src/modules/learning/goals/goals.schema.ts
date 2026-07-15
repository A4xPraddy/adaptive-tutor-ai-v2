import { z } from "zod";

export const createGoalSchema = z.object({
  title: z.string().min(3).max(100),

  description: z.string().optional(),

  experienceLevel: z.enum([
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
  ]),

  dailyStudyMinutes: z
    .number()
    .int()
    .min(15)
    .max(600),

  targetDate: z.coerce.date(),
});

export type CreateGoalInput = z.infer<
  typeof createGoalSchema
>;