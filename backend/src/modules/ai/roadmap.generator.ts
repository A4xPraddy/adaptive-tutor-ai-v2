export const generateRoadmap = (goal: string) => {
  switch (goal.toLowerCase()) {
    case "become backend engineer":
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

    case "become ai engineer":
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

    default:
      return [
        "Introduction",
        "Basics",
        "Intermediate",
        "Advanced",
      ];
  }
};