import { GroqProvider } from "./groq.provider.js";
import { buildLessonPrompt } from "./prompt.builder.js";
import { AIResponseParser } from "./response.parser.js";

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

  const start = Date.now();

  const rawResponse = await groq.generate(prompt);

  const duration = Date.now() - start;

  const content =
    AIResponseParser.parseMarkdown(rawResponse);

  console.log("========== AI Lesson Generation ==========");
  console.log(`Provider : Groq`);
  console.log(`Topic    : ${topic}`);
  console.log(`Level    : ${level}`);
  console.log(`Time     : ${duration} ms`);
  console.log(`Prompt   : ${prompt.length} chars`);
  console.log(`Response : ${rawResponse.length} chars`);
  console.log("==========================================");

  return {
    title: topic,
    content,
  };
};