import { prisma } from "../../../lib/prisma.js";
import { generateLesson } from "../../ai/lesson.generator.js";
import { getRoadmapModuleById } from "../roadmap/roadmap.repository.js";
import {
  createLesson,
  getLessonByModuleId,
  updateLesson,
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

export const regenerateLessonService = async (
  moduleId: string
) => {
  const module = await getRoadmapModuleById(moduleId);

  if (!module) {
    throw new Error("Roadmap module not found");
  }

  const generatedLesson = await generateLesson(
    module.title,
    module.roadmap.goal.experienceLevel
  );

  return prisma.$transaction(async (tx) => {
    const existingLesson =
      await getLessonByModuleId(moduleId);

    if (!existingLesson) {
      return createLesson(
        tx,
        module.id,
        generatedLesson.title,
        generatedLesson.content
      );
    }

    return updateLesson(
      tx,
      existingLesson.id,
      generatedLesson.title,
      generatedLesson.content
    );
  });
};