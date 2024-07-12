/*
  Warnings:

  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Folder";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Flow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "folderId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    CONSTRAINT "Flow_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "folders" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Flow_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "destinations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "flowId" TEXT,
    "destination_id" TEXT,
    CONSTRAINT "folders_destination_id_fkey" FOREIGN KEY ("destination_id") REFERENCES "destinations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "extensions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "folder_id" TEXT,
    CONSTRAINT "extensions_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "destinations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
