import { Response, NextFunction } from "express";
import { getRoadmapService } from "./roadmap.service.js";
import { sendResponse } from "../../../shared/utils/response.js";

export const getRoadmapController = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const roadmap = await getRoadmapService(
      req.params.goalId
    );

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