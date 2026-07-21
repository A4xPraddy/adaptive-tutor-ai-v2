import { z } from "zod";

export const tutorChatSchema = z.object({
  lessonId: z.string().uuid(),
  message: z.string().min(1).max(2000),
});

export type TutorChatInput = z.infer<typeof tutorChatSchema>;