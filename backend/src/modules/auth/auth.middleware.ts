import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../shared/utils/jwt.js";
import { findUserById } from "./auth.repository.js";

interface JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: Awaited<ReturnType<typeof findUserById>>;
}

export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Read token from cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No token found",
      });
    }

    // 2. Verify JWT
    const decoded = verifyToken(token) as JwtPayload;

    // 3. Find user from database
    const user = await findUserById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 4. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};