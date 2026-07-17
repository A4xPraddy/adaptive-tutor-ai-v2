export const buildRoadmapPrompt = (
  goal: string,
  level: string
) => {
  return `
You are a senior software engineer and curriculum designer.

Your task is to create a complete learning roadmap.

Goal:
${goal}

Experience Level:
${level}

Requirements:

- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT wrap the response inside triple backticks.
- Generate exactly 8-10 learning modules.
- Modules must follow a logical learning order.
- Avoid duplicate topics.
- Every module should build on the previous one.
- Keep titles concise.
- Descriptions should be 1-2 sentences.

Each module must contain:

- title
- description
- order

Return JSON exactly like this:

[
  {
    "title": "JavaScript Fundamentals",
    "description": "Learn variables, functions, arrays, objects, ES6 syntax and problem solving.",
    "order": 1
  }
]

Return ONLY the JSON array.
`;
};

export const buildLessonPrompt = (
  topic: string,
  level: string
) => {
  return `
You are an experienced software engineer, mentor and technical educator.

Teach the following topic.

Topic:
${topic}

Student Level:
${level}

Requirements:

- Return ONLY markdown.
- Write in simple, beginner-friendly language.
- Explain concepts before showing code.
- Use practical examples.
- Avoid unnecessary theory.
- Keep formatting clean.

Generate the lesson using the following structure.

# Introduction

Briefly introduce the topic.

# Learning Objectives

Mention what the student will learn.

# Explanation

Explain the concept in detail.

# Real-world Analogy

Relate the concept to a real-world example.

# Code Example

Provide a well-formatted example if applicable.

# Common Mistakes

List common beginner mistakes.

# Best Practices

Mention production-level best practices.

# Practice Exercise

Give one hands-on exercise.

# Quiz

Generate 5 MCQs.

# Summary

Summarize the lesson in 4-6 bullet points.

Return ONLY markdown.
`;
};