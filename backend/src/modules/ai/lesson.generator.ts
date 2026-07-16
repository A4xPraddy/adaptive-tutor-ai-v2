import { GroqProvider } from "./groq.provider.js";
import { buildLessonPrompt } from "./prompt.builder.js";

const groq = new GroqProvider();

export interface GeneratedLesson {
  title: string;
  content: string;
}

export const generateLesson = async (
  topic: string,
  level: string
): Promise<GeneratedLesson> => {
  const prompt = buildLessonPrompt(topic, level);

  const content = await groq.generate(prompt);

  return {
    title: topic,
    content,
  };
};