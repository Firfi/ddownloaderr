-- CreateTable
CREATE TABLE "Meta" (
    "url" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "linkCount" INTEGER NOT NULL,
    "imageCount" INTEGER NOT NULL
);
