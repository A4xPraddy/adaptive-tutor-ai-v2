import { RoadmapItem, RoadmapProvider } from "./roadmap.provider.js";

export class MockRoadmapProvider implements RoadmapProvider {
  async generate(goal: string): Promise<RoadmapItem[]> {
    if (goal.toLowerCase().includes("backend")) {
      return [
        {
          title: "JavaScript",
          description: "Learn JavaScript fundamentals.",
          order: 1,
        },
        {
          title: "Node.js",
          description: "Build server-side applications using Node.js.",
          order: 2,
        },
        {
          title: "Express.js",
          description: "Create REST APIs with Express.",
          order: 3,
        },
        {
          title: "Authentication",
          description: "Implement JWT and secure authentication.",
          order: 4,
        },
        {
          title: "Prisma",
          description: "Learn Prisma ORM with PostgreSQL.",
          order: 5,
        },
        {
          title: "Redis",
          description: "Understand caching and session management.",
          order: 6,
        },
        {
          title: "Docker",
          description: "Containerize backend applications.",
          order: 7,
        },
        {
          title: "AWS",
          description: "Deploy backend applications on AWS.",
          order: 8,
        },
      ];
    }

    return [
      {
        title: "Introduction",
        description: "Introduction to the subject.",
        order: 1,
      },
      {
        title: "Basics",
        description: "Learn the core fundamentals.",
        order: 2,
      },
    ];
  }
}