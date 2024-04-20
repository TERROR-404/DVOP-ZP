CREATE TABLE IF NOT EXISTS public."book" (
  "isbn" text CONSTRAINT "isbn_book" PRIMARY KEY,
  "name" text NOT NULL,
  "language" text NOT NULL,
  "issueNumber" integer NOT NULL,
  "pages" integer NOT NULL,
  "content" text,
  "year" integer NOT NULL
);