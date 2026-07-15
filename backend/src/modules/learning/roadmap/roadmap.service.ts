import { getRoadmapsByGoalId } from "./roadmap.repository.js";

export const getRoadmapService = async (goalId: string) => {
  return getRoadmapsByGoalId(goalId);
};