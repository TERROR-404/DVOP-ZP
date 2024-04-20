CREATE TABLE IF NOT EXISTS public."library_book" (
  "id_library" integer NOT NULL,
  "isbn_book" text NOT NULL,
  FOREIGN KEY ("id_library") REFERENCES "library" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY ("isbn_book") REFERENCES "book" ("isbn") ON DELETE CASCADE ON UPDATE CASCADE
);