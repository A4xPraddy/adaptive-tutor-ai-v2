import { GroqProvider } from "../../ai/groq.provider.js";
import { getLessonById } from "./tutor.repository.js";
import { buildTutorPrompt } from "./tutor.prompt.js";
import { AIResponseParser } from "../../ai/response.parser.js";

const groq = new GroqProvider();

export const tutorChatService = async (
  lessonId: string,
  message: string
) => {
  const lesson = await getLessonById(lessonId);

  if (!lesson) {
    throw new Error("Lesson not found.");
  }

  const prompt = buildTutorPrompt(
    lesson.title,
    lesson.content,
    message
  );

  const start = Date.now();

  const rawResponse = await groq.generate(prompt);

  const duration = Date.now() - start;

  console.log("========== AI Tutor ==========");
  console.log(`Lesson : ${lesson.title}`);
  console.log(`Time   : ${duration} ms`);
  console.log("==============================");

return {
  answer: AIResponseParser.clean(rawResponse),
};
};