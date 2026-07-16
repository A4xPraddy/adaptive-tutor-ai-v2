import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,

  CLIENT_URL: process.env.CLIENT_URL,

  // AI
  GROQ_API_KEY: process.env.GROQ_API_KEY,
  AI_MODEL: process.env.AI_MODEL,
};