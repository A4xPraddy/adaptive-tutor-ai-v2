import { Request, Response } from "express";

export const notFoundMiddleware = (
  req: Request,
  res: Response
) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
};