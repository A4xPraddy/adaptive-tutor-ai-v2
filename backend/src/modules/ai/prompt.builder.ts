export const buildLessonPrompt = (
  topic: string,
  level: string
) => {
  return `
Teach ${topic}
for a ${level} student.

Return

Summary

Explanation

Examples

Practice

Quiz
`;
};