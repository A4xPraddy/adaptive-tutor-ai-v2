import { buildRoadmapPrompt } from "./prompt.builder.js";
import { GroqProvider } from "./groq.provider.js";
import { RoadmapItem } from "./roadmap.provider.js";

const groq = new GroqProvider();

export const generateRoadmap = async (
  goal: string,
  level: string
): Promise<RoadmapItem[]> => {
  const prompt = buildRoadmapPrompt(goal, level);

  const response = await groq.generate(prompt);

  try {
    const roadmap = JSON.parse(response) as RoadmapItem[];

    if (!Array.isArray(roadmap)) {
      throw new Error("Invalid roadmap format");
    }

    return roadmap;
  } catch (error) {
    throw new Error("Failed to parse AI roadmap response.");
  }
};