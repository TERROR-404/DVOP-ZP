CREATE TABLE IF NOT EXISTS public."book_genre" (
  "isbn_book" text NOT NULL,
  "id_genre" integer NOT NULL,
  FOREIGN KEY ("isbn_book") REFERENCES "book" ("isbn") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("id_genre") REFERENCES "genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);