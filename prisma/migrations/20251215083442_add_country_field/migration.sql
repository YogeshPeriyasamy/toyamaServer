/*
  Warnings:

  - Added the required column `city` to the `Emails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Emails` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Emails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Emails" ("createdAt", "email", "id", "message", "name", "phone", "subject") SELECT "createdAt", "email", "id", "message", "name", "phone", "subject" FROM "Emails";
DROP TABLE "Emails";
ALTER TABLE "new_Emails" RENAME TO "Emails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
