export const generateRoadmap = (goal: string): string[] => {
  const value = goal.toLowerCase();

  if (value.includes("backend")) {
    return [
      "JavaScript",
      "Node.js",
      "Express.js",
      "Authentication",
      "Prisma",
      "Redis",
      "Docker",
      "AWS",
    ];
  }

  if (value.includes("ai")) {
    return [
      "Python",
      "NumPy",
      "Pandas",
      "Machine Learning",
      "Deep Learning",
      "LLMs",
      "RAG",
      "AI Agents",
    ];
  }

  return [
    "Introduction",
    "Basics",
    "Intermediate",
    "Advanced",
  ];
};