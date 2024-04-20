CREATE TABLE IF NOT EXISTS public."library" (
  "id" serial CONSTRAINT "id_library" PRIMARY KEY,
  "name" text NOT NULL,
  "adress" text NOT NULL,
  "id_region" integer NOT NULL,
  FOREIGN KEY ("id_region") REFERENCES "region" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);