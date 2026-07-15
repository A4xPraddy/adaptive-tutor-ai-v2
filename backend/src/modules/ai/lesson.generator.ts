export const generateLesson = async (
  topic: string
) => {
  return {
    title: topic,

    summary:
      `${topic} is one of the important concepts.`,

    explanation:
      `This explanation is temporary. AI will generate this later.`,

    examples: [],

    practice: [],

    quiz: [],
  };
};