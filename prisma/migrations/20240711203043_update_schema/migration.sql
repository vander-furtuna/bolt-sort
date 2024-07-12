/*
  Warnings:

  - You are about to drop the column `path` on the `sorters` table. All the data in the column will be lost.
  - Added the required column `folder_id` to the `sorters` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_destinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folder_id" TEXT NOT NULL,
    "sorter_id" TEXT,
    CONSTRAINT "destinations_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "destinations_sorter_id_fkey" FOREIGN KEY ("sorter_id") REFERENCES "sorters" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_destinations" ("created_at", "folder_id", "id") SELECT "created_at", "folder_id", "id" FROM "destinations";
DROP TABLE "destinations";
ALTER TABLE "new_destinations" RENAME TO "destinations";
CREATE TABLE "new_sorters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folder_id" TEXT NOT NULL,
    CONSTRAINT "sorters_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sorters" ("created_at", "id") SELECT "created_at", "id" FROM "sorters";
DROP TABLE "sorters";
ALTER TABLE "new_sorters" RENAME TO "sorters";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
