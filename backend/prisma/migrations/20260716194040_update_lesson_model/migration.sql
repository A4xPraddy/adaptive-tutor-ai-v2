/*
  Warnings:

  - You are about to drop the column `order` on the `Lesson` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[moduleId]` on the table `Lesson` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Lesson" DROP COLUMN "order";

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_moduleId_key" ON "public"."Lesson"("moduleId");
