/*
  Warnings:

  - You are about to drop the `Flow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `folders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `created_at` on the `destinations` table. All the data in the column will be lost.
  - You are about to drop the column `folder_id` on the `extensions` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `extensions` table. All the data in the column will be lost.
  - Added the required column `path` to the `destinations` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Flow";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "folders";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "flows" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" TEXT NOT NULL,
    "folder_id" TEXT NOT NULL,
    "destination_id" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_destinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "flow_id" TEXT,
    CONSTRAINT "destinations_flow_id_fkey" FOREIGN KEY ("flow_id") REFERENCES "flows" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_destinations" ("id") SELECT "id" FROM "destinations";
DROP TABLE "destinations";
ALTER TABLE "new_destinations" RENAME TO "destinations";
CREATE TABLE "new_extensions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "destination_id" TEXT,
    CONSTRAINT "extensions_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_extensions" ("created_at", "id", "name") SELECT "created_at", "id", "name" FROM "extensions";
DROP TABLE "extensions";
ALTER TABLE "new_extensions" RENAME TO "extensions";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
