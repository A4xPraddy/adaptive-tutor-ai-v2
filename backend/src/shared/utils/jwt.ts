import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";

export const generateToken = (userId: string) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign(
    { userId },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token: string) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.verify(token, env.JWT_SECRET);
};