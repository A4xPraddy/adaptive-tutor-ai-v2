export const buildTutorPrompt = (
  lessonTitle: string,
  lessonContent: string,
  studentQuestion: string
) => {
  return `
You are an expert AI tutor.

Current Lesson:
${lessonTitle}

Lesson Content:
${lessonContent}

Student Question:
${studentQuestion}

Instructions:
- Answer based on the lesson.
- Explain in simple language.
- Give practical examples whenever possible.
- If the answer is outside the lesson, clearly mention it.
`;
};