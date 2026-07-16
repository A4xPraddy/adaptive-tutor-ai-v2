import { prisma } from "../../../lib/prisma.js";
import { generateLesson } from "../../ai/lesson.generator.js";
import { getRoadmapModuleById } from "../roadmap/roadmap.repository.js";
import {
  createLesson,
  getLessonByModuleId,
} from "./lesson.repository.js";

export const getLessonService = async (
  moduleId: string
) => {
  return getLessonByModuleId(moduleId);
};

export const generateLessonService = async (
  moduleId: string
) => {
  const existingLesson = await getLessonByModuleId(
    moduleId
  );

  if (existingLesson) {
    return existingLesson;
  }

  const module = await getRoadmapModuleById(moduleId);

  if (!module) {
    throw new Error("Roadmap module not found");
  }

  const lesson = await generateLesson(
    module.title,
    module.roadmap.goal.experienceLevel
  );

  return prisma.$transaction(async (tx) => {
    return createLesson(
      tx,
      module.id,
      lesson.title,
      lesson.content
    );
  });
};