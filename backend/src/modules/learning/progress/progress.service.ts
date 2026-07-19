import { ProgressStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma.js";

import {
  findProgressByUserAndModule,
  createProgress,
  completeProgress,
  getRoadmapModules,
  getGoalRoadmaps,
  countCompletedModules,
} from "./progress.repository.js";
export const completeLessonService = async (
  userId: string,
  lessonId: string
) => {
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      moduleId: true,
    },
  });

  if (!lesson) {
    throw new Error("Lesson not found.");
  }

  let progress = await findProgressByUserAndModule(
    userId,
    lesson.moduleId
  );

  if (!progress) {
    progress = await createProgress(userId, lesson.moduleId);
  }

  if (progress.status !== ProgressStatus.COMPLETED) {
    progress = await completeProgress(progress.id);
  }

  return progress;
};

export const getRoadmapProgressService = async (
  userId: string,
  roadmapId: string
) => {
  const modules = await getRoadmapModules(roadmapId);

  const moduleIds = modules.map((m) => m.id);

  const completed = await countCompletedModules(
    userId,
    moduleIds
  );

  const percentage =
    moduleIds.length === 0
      ? 0
      : Math.round((completed / moduleIds.length) * 100);

  return {
    totalModules: moduleIds.length,
    completedModules: completed,
    percentage,
  };
};

export const getGoalProgressService = async (
  userId: string,
  goalId: string
) => {
  const roadmaps = await getGoalRoadmaps(goalId);

  const moduleIds = roadmaps.flatMap((roadmap) =>
    roadmap.modules.map((module) => module.id)
  );

  const completed = await countCompletedModules(
    userId,
    moduleIds
  );

  const percentage =
    moduleIds.length === 0
      ? 0
      : Math.round((completed / moduleIds.length) * 100);

  return {
    totalModules: moduleIds.length,
    completedModules: completed,
    percentage,
  };
};