/*
  Warnings:

  - You are about to drop the column `order` on the `Roadmap` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Roadmap" DROP COLUMN "order";

-- CreateTable
CREATE TABLE "public"."RoadmapModule" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "order" INTEGER NOT NULL,
    "roadmapId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Lesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "moduleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RoadmapModule_roadmapId_idx" ON "public"."RoadmapModule"("roadmapId");

-- CreateIndex
CREATE INDEX "Lesson_moduleId_idx" ON "public"."Lesson"("moduleId");

-- CreateIndex
CREATE INDEX "Goal_userId_idx" ON "public"."Goal"("userId");

-- CreateIndex
CREATE INDEX "Roadmap_goalId_idx" ON "public"."Roadmap"("goalId");

-- AddForeignKey
ALTER TABLE "public"."RoadmapModule" ADD CONSTRAINT "RoadmapModule_roadmapId_fkey" FOREIGN KEY ("roadmapId") REFERENCES "public"."Roadmap"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Lesson" ADD CONSTRAINT "Lesson_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."RoadmapModule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
