import { buildRoadmapPrompt } from "./prompt.builder.js";
import { GroqProvider } from "./groq.provider.js";
import { AIResponseParser } from "./response.parser.js";
import { RoadmapItem } from "./roadmap.provider.js";

const groq = new GroqProvider();

export const generateRoadmap = async (
  goal: string,
  level: string
): Promise<RoadmapItem[]> => {
  const prompt = buildRoadmapPrompt(goal, level);

  const start = Date.now();

  const rawResponse = await groq.generate(prompt);

  const duration = Date.now() - start;

  console.log("========= AI Roadmap Generation =========");
  console.log(`Provider : Groq`);
  console.log(`Goal     : ${goal}`);
  console.log(`Level    : ${level}`);
  console.log(`Time     : ${duration} ms`);
  console.log(`Prompt   : ${prompt.length} chars`);
  console.log(`Response : ${rawResponse.length} chars`);
  console.log("=========================================");

  const roadmap =
    AIResponseParser.parseJson<RoadmapItem[]>(rawResponse);

  if (!Array.isArray(roadmap)) {
    throw new Error("Invalid roadmap format returned by AI.");
  }

  return roadmap;
};