/*
  Warnings:

  - Added the required column `name` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_folders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_folders" ("created_at", "id", "path") SELECT "created_at", "id", "path" FROM "folders";
DROP TABLE "folders";
ALTER TABLE "new_folders" RENAME TO "folders";
CREATE UNIQUE INDEX "folders_path_key" ON "folders"("path");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
