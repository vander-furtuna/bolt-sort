/*
  Warnings:

  - You are about to drop the `flows` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `flow_id` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `destinations` table. All the data in the column will be lost.
  - The primary key for the `extensions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `extensions` table. All the data in the column will be lost.
  - Added the required column `folder_id` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "flows";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "sorters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_destinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folder_id" TEXT NOT NULL,
    CONSTRAINT "destinations_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_destinations" ("id") SELECT "id" FROM "destinations";
DROP TABLE "destinations";
ALTER TABLE "new_destinations" RENAME TO "destinations";
CREATE TABLE "new_extensions" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "destination_id" TEXT,
    CONSTRAINT "extensions_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_extensions" ("created_at", "destination_id", "name") SELECT "created_at", "destination_id", "name" FROM "extensions";
DROP TABLE "extensions";
ALTER TABLE "new_extensions" RENAME TO "extensions";
CREATE UNIQUE INDEX "extensions_name_key" ON "extensions"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "folders_path_key" ON "folders"("path");
