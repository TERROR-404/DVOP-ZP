CREATE TABLE IF NOT EXISTS public."book_author" (
  "isbn_book" text NOT NULL,
  "id_author" integer NOT NULL,
  FOREIGN KEY ("isbn_book") REFERENCES "book" ("isbn") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("id_author") REFERENCES "author" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);