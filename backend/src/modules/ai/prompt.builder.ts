export const buildRoadmapPrompt = (
  goal: string,
  level: string
) => {
  return `
You are an expert curriculum designer.

Generate a structured learning roadmap for the following goal.

Goal:
${goal}

Experience Level:
${level}

Rules:
- Return ONLY valid JSON.
- Do not use markdown.
- Do not wrap the response inside triple backticks.
- Generate 8-10 learning modules.
- Modules should be beginner friendly and logically ordered.
- Each module must have:
  - title
  - description
  - order

Return JSON in this format:

[
  {
    "title": "JavaScript Fundamentals",
    "description": "Learn variables, functions, objects and ES6 features.",
    "order": 1
  }
]
`;
};

export const buildLessonPrompt = (
  topic: string,
  level: string
) => {
  return `
Teach ${topic}
for a ${level} student.

Return ONLY markdown.

Include:

# Summary

# Explanation

# Real-world Example

# Code Example (if applicable)

# Practice Exercise

# Quiz (5 MCQs)

Keep the lesson beginner friendly.
`;
};