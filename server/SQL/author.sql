CREATE TABLE IF NOT EXISTS public."author" (
  "id" serial CONSTRAINT "id_author" PRIMARY KEY,
  "name" text NOT NULL
);