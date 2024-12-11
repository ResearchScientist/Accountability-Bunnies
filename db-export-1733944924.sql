PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Goals" ("id" integer PRIMARY KEY, "description" text NOT NULL, "completed" text NOT NULL DEFAULT 'no');
INSERT INTO Goals VALUES(1,'contact people with the roles you want for a conversation on what to improve','no');
INSERT INTO Goals VALUES(13,'update influence map','yes');
CREATE TABLE IF NOT EXISTS "Bunnies" ("id" integer PRIMARY KEY, "totalBunnies" integer NOT NULL, "updated" integer NOT NULL DEFAULT FALSE);
INSERT INTO Bunnies VALUES(1,3,0);
COMMIT;
