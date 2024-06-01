CREATE TABLE IF NOT EXISTS public."admin" (
  "id" serial CONSTRAINT "id_admin" PRIMARY KEY,
  "name" text NOT NULL,
  "password" text NOT NULL
);