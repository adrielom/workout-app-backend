-- CreateTable
CREATE TABLE "UserExerciseSets" (
    "userId" TEXT NOT NULL,
    "exerciseSetId" TEXT NOT NULL,

    CONSTRAINT "UserExerciseSets_pkey" PRIMARY KEY ("userId","exerciseSetId")
);

-- AddForeignKey
ALTER TABLE "UserExerciseSets" ADD CONSTRAINT "UserExerciseSets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExerciseSets" ADD CONSTRAINT "UserExerciseSets_exerciseSetId_fkey" FOREIGN KEY ("exerciseSetId") REFERENCES "ExerciseSet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
