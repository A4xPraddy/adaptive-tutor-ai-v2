import { RoadmapItem, RoadmapProvider } from "./roadmap.provider.js";

export class MockRoadmapProvider implements RoadmapProvider {
  async generate(goal: string): Promise<RoadmapItem[]> {
    if (goal.toLowerCase().includes("backend")) {
      return [
        { title: "JavaScript", order: 1 },
        { title: "Node.js", order: 2 },
        { title: "Express.js", order: 3 },
        { title: "Authentication", order: 4 },
        { title: "Prisma", order: 5 },
        { title: "Redis", order: 6 },
        { title: "Docker", order: 7 },
        { title: "AWS", order: 8 },
      ];
    }

    return [
      { title: "Introduction", order: 1 },
      { title: "Basics", order: 2 },
    ];
  }
}