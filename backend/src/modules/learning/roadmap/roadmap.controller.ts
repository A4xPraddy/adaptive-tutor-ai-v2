import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../shared/utils/response.js";
import {
  generateRoadmapService,
  getRoadmapService,
} from "./roadmap.service.js";

export const getRoadmapController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roadmap = await getRoadmapService(req.params.goalId as string);

    return sendResponse(
      res,
      200,
      "Roadmap fetched successfully",
      roadmap
    );
  } catch (error) {
    next(error);
  }
};

export const generateRoadmapController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roadmap = await generateRoadmapService(req.params.goalId as string);

    return sendResponse(
      res,
      201,
      "Roadmap generated successfully",
      roadmap
    );
  } catch (error) {
    next(error);
  }
};