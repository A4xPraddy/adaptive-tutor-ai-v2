import { GroqProvider } from "./groq.provider.js";
import { buildQuizPrompt } from "./prompt.builder.js";
import { AIResponseParser } from "./response.parser.js";

const groq = new GroqProvider();

export interface GeneratedQuizQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string;
  order: number;
}

export const generateQuiz = async (
  topic: string,
  level: string
): Promise<GeneratedQuizQuestion[]> => {
  const prompt = buildQuizPrompt(topic, level);

  const start = Date.now();

  const rawResponse = await groq.generate(prompt);

  const duration = Date.now() - start;

  console.log("=========== AI Quiz Generation ===========");
  console.log(`Provider : Groq`);
  console.log(`Topic    : ${topic}`);
  console.log(`Level    : ${level}`);
  console.log(`Time     : ${duration} ms`);
  console.log(`Prompt   : ${prompt.length} chars`);
  console.log(`Response : ${rawResponse.length} chars`);
  console.log("==========================================");

  const quiz =
    AIResponseParser.parseJson<GeneratedQuizQuestion[]>(
      rawResponse
    );

  if (!Array.isArray(quiz)) {
    throw new Error("Invalid quiz format returned by AI.");
  }

  if (quiz.length === 0) {
    throw new Error("Quiz contains no questions.");
  }

  return quiz;
};