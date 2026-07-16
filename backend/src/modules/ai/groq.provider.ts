import Groq from "groq-sdk";
import { env } from "../../config/env.js";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export class GroqProvider {
  async generate(prompt: string): Promise<string> {
    const response = await groq.chat.completions.create({
      model: env.AI_MODEL,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are an expert software engineering tutor. Always return exactly what is requested.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0]?.message?.content ?? "";
  }
}