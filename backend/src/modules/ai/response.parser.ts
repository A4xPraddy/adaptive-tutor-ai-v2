export class AIResponseParser {
  private static readonly MIN_RESPONSE_LENGTH = 50;

  private static readonly AI_REFUSAL_PATTERNS = [
    "i'm sorry",
    "i cannot",
    "i can't",
    "as an ai",
    "i am unable",
    "i do not have",
    "i'm unable",
  ];

  static clean(response: string): string {
    if (!response || response.trim().length === 0) {
      throw new Error("AI returned an empty response.");
    }

    let cleaned = response.trim();

    // Remove markdown code fences
    cleaned = cleaned.replace(/^```(?:json|markdown)?/i, "");
    cleaned = cleaned.replace(/```$/i, "");

    cleaned = cleaned.trim();

    this.validate(cleaned);

    return cleaned;
  }

  private static validate(response: string): void {
    if (response.length === 0) {
      throw new Error("AI response is empty after parsing.");
    }

    if (response.length < this.MIN_RESPONSE_LENGTH) {
      throw new Error("AI response is too short.");
    }

    const lowerCaseResponse = response.toLowerCase();

    const refused = this.AI_REFUSAL_PATTERNS.some((pattern) =>
      lowerCaseResponse.includes(pattern)
    );

    if (refused) {
      throw new Error("AI refused to generate content.");
    }
  }

  static parseJson<T>(response: string): T {
    const cleaned = this.clean(response);

    try {
      return JSON.parse(cleaned) as T;
    } catch {
      throw new Error("Invalid JSON returned by AI.");
    }
  }

  static parseMarkdown(response: string): string {
    const cleaned = this.clean(response);

    if (!cleaned.includes("#")) {
      throw new Error("Invalid markdown returned by AI.");
    }

    return cleaned;
  }
}