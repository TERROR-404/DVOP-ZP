import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import pg from "pg";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(helmet());
app.use('/', express.static("public"));
app.use(bodyParser.json());

const { Client } = pg

const client = new Client({
    host: 'hosting.ssps.cajthaml.eu',
    port: 3337,
    user: 'cmerda_bohumil_64d3f_wexcw',
    password: 'gJChPeI4uhZr3XoIbF5A1yWOiORNCKnK',
    database: 'cmerda_bohumil_64d3f_wexcw_db'
})
client.connect();
//user
//region
app.get("/user/region", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM region;'));
});

app.get("/user/region/:id/library", async (req, res) => {
    let regionId = await client.query('SELECT id FROM public."region" WHERE "name" = $1 LIMIT 1;',[req.params.id]);
    res.send(await client.query(`SELECT * FROM public."library" WHERE "library"."id_region" = '${regionId.rows[0].id}';`));
    res.status(200);
});
//genre
app.get("/user/genre", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM genre;'));
});
//author
app.get("/user/author", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM public."author";'));
});
//book
app.get("/user/book", async (req, res) => {
    res.status(200);
    const book = await client.query(`SELECT "book"."isbn", "book"."name" AS "book_name", "book"."language", "book"."issueNumber", "book"."year", "book"."pages", "book"."content", "library"."name" AS "library_name", "library"."adress", "region"."name" AS "region_name" FROM public."book"
    JOIN "library_book"
    ON "book"."isbn" = "library_book"."isbn_book"
    JOIN "library"
    ON "library_book"."id_library" = "library"."id"
    JOIN "region"
    ON "library"."id_region" = "region"."id";`);

    const authors = await client.query(`SELECT "book"."isbn", "author"."name" AS "author_name" FROM public."book"
    JOIN "book_author"
    ON "book"."isbn" = "book_author"."isbn_book"
    JOIN "author"
    ON "book_author"."id_author" = "author"."id";`);

    const genres = await client.query(`SELECT "book"."isbn", "genre"."name" AS "genre_name" FROM public."book"
    JOIN "book_genre"
    ON "book"."isbn" = "book_genre"."isbn_book"
    JOIN "genre"
    ON "book_genre"."id_genre" = "genre"."id";`);

    let response = {
        "book": book,
        "authors": authors,
        "genres": genres
    }
    res.send(response);
});

//admin
//autentikace
app.post("/authenticate", async (req, res) => {
    const userName = req.body.user;
    const userPassword = req.body.password;
    const adminData = await client.query('SELECT * FROM public."admin";');
    for (const admin of adminData.rows) {
        let adminName = admin.name;
        let adminPassword = admin.password;
        if(userName == adminName && bcrypt.compareSync(userPassword,adminPassword)) {
            const token = jwt.sign({
                user: adminName
            }, "$2b$10$iM/wzsdV0Qbzzo0Z9Alp3O8JIwUljzdh8N77gvtz9mNtQ36Mlfsjy",{
                expiresIn: `1d`
            });
    
            res.send({token: token});
        } else {
            res.status(401);
            res.send({token: undefined});
        }
        
    }
});

//roybilo se a nepovedlo se na posledn9 chv9li opravit
/*app.use(async (req, res, next) => {
    
    const token = req.headers["authentication"];

    if(!token) {
        res.status(498);
        res.send("Chybí token");
        return;
    }

    try {
        const ttt = jwt.verify(token, "wzsdV0Qbzzo0Z9Alp3O8JIwUljzdh8N77gvtz9mNtQ36Mlfsjy");
        req.authentication = ttt.user;
    } catch(e) {
        res.status(498);
        res.send("Token je nesprávný");
        return;
    }
    next();
})*/

//region
app.get("/region", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM region;'));
});

app.get("/region/:id/library", async (req, res) => {
    let regionId = await client.query('SELECT id FROM public."region" WHERE "name" = $1 LIMIT 1;',[req.params.id]);
    res.send(await client.query(`SELECT * FROM public."library" WHERE "library"."id_region" = '${regionId.rows[0].id}';`));
    res.status(200);
});

//library
app.get("/library", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT "library"."name" AS "library_name","adress","region"."name" AS "region_name" FROM "library" JOIN "region" ON "library"."id_region" = "region"."id";'));
});

app.post("/library", async (req, res) => {
    const regionId = await client.query('SELECT id FROM public."region" WHERE "name" = $1 LIMIT 1;',[req.body.region]);
    const newRegionId = regionId.rows[0].id;
    const newName = req.body.name;
    const newAddress = req.body.address;
    let exist = false;
    const libraries = await client.query('SELECT * FROM public."library";');
    for (let index = 0; index < libraries.rows.length; index++) {
        if ((libraries.rows[index].name == newName) && (libraries.rows[index].adress == newAddress) && (libraries.rows[index].id_region == newRegionId)) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        await client.query(`INSERT INTO public."library" ("name","adress","id_region") VALUES ('${newName}','${newAddress}','${newRegionId}');`);
        res.status(201);
        res.send("Knihovna vytvořena");
    }
    else{
        res.status(409);
        res.send("Knihovna již existuje");
    }
});

app.delete("/library/:id", async (req, res) => {
    const params = req.params.id.split("_");
    const regionId = await client.query('SELECT id FROM public."region" WHERE "name" = $1 LIMIT 1;',[params[2]]);
    const newRegionId = regionId.rows[0].id;
    await client.query(`DELETE FROM public."library" WHERE "id_region" = '${newRegionId}' AND "name" = '${params[0]}' AND "adress" = '${params[1]}';`)
    res.status(200);
    res.send("Knihovna smazána");
});

//genre
app.get("/genre", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM genre;'));
});

app.post("/genre", async (req, res) => {
    const newName = req.body.name;
    let exist = false;
    const genres = await client.query('SELECT "name" FROM public."genre";');
    for (let index = 0; index < genres.rows.length; index++) {
        if (genres.rows[index].name == newName) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        await client.query(`INSERT INTO public."genre" ("name") VALUES ('${newName}');`);
        res.status(201);
        res.send("Žánr vytvořen");
    }
    else{
        res.status(409);
        res.send("Žánr již existuje");
    }
});

app.delete("/genre/:id", async (req, res) => {
    await client.query(`DELETE FROM public."genre" WHERE "name" = '${req.params.id}';`)
    res.status(200);
    res.send("Žánr smazán");
});

//author
app.get("/author", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM public."author";'));
});

app.post("/author", async (req, res) => {
    const newName = req.body.name;
    let exist = false;
    const authors = await client.query('SELECT "name" FROM public."author";');
    for (let index = 0; index < authors.rows.length; index++) {
        if (authors.rows[index].name == newName) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        await client.query(`INSERT INTO public."author" ("name") VALUES ('${newName}');`);
        res.status(201);
        res.send("Autor vytvořen");
    }
    else{
        res.status(409);
        res.send("Autor již existuje");
    }
});

app.delete("/author/:id", async (req, res) => {
    await client.query(`DELETE FROM public."author" WHERE "name" = '${req.params.id}';`)
    res.status(200);
    res.send("Autor smazán");
});

//book
app.get("/book", async (req, res) => {
    res.status(200);
    const book = await client.query(`SELECT "book"."isbn", "book"."name" AS "book_name", "book"."language", "book"."issueNumber", "book"."year", "book"."pages", "book"."content", "library"."name" AS "library_name", "library"."adress", "region"."name" AS "region_name" FROM public."book"
    JOIN "library_book"
    ON "book"."isbn" = "library_book"."isbn_book"
    JOIN "library"
    ON "library_book"."id_library" = "library"."id"
    JOIN "region"
    ON "library"."id_region" = "region"."id";`);

    const authors = await client.query(`SELECT "book"."isbn", "author"."name" AS "author_name" FROM public."book"
    JOIN "book_author"
    ON "book"."isbn" = "book_author"."isbn_book"
    JOIN "author"
    ON "book_author"."id_author" = "author"."id";`);

    const genres = await client.query(`SELECT "book"."isbn", "genre"."name" AS "genre_name" FROM public."book"
    JOIN "book_genre"
    ON "book"."isbn" = "book_genre"."isbn_book"
    JOIN "genre"
    ON "book_genre"."id_genre" = "genre"."id";`);

    let response = {
        "book": book,
        "authors": authors,
        "genres": genres
    }
    res.send(response);
});

app.post("/book", async (req, res) => {
    const newIsbn = req.body.isbn;
    const newName = req.body.name;
    const newLanguage = req.body.language;
    const newIssueNumber = req.body.issueNumber;
    const newPages = req.body.pages;
    const newContent = req.body.description;
    const newYear = req.body.year;
    const regionId = await client.query('SELECT id FROM public."region" WHERE "name" = $1 LIMIT 1;',[req.body.region]);
    const newRegionId = regionId.rows[0].id;
    const libraryId = await client.query(`SELECT id FROM public."library" WHERE "name" = '${req.body.library}' AND "id_region" = '${newRegionId}' LIMIT 1;`);
    const newLibraryId = libraryId.rows[0].id;
    const newGenres = req.body.genres;
    let newGenreIds = [];
    for (const genre of newGenres) {
        let genreId = await client.query(`SELECT id FROM public."genre" WHERE "name" = '${genre}' LIMIT 1;`);
        newGenreIds.push(genreId.rows[0].id);
    }
    const newAuthors = req.body.authors;
    let newAuthorIds = [];
    for (const author of newAuthors) {
        let authorId = await client.query(`SELECT id FROM public."author" WHERE "name" = '${author}' LIMIT 1;`);
        newAuthorIds.push(authorId.rows[0].id);
    }
    
    let exist = false;
    const books = await client.query('SELECT "isbn" FROM public."book";');
    for (let index = 0; index < books.rows.length; index++) {
        if (books.rows[index].isbn == newIsbn) {
            exist = true;
            break;
        }
    }
    if (!exist) {
        await client.query(`INSERT INTO public."book" ("isbn","name","language","issueNumber","pages","content","year") VALUES ('${newIsbn}','${newName}','${newLanguage}','${newIssueNumber}','${newPages}','${newContent}','${newYear}');`);
        await client.query(`INSERT INTO public."library_book" ("id_library","isbn_book") VALUES ('${newLibraryId}','${newIsbn}');`);
        for (const genreId of newGenreIds) {
            await client.query(`INSERT INTO public."book_genre" ("isbn_book","id_genre") VALUES ('${newIsbn}','${genreId}');`);
        }
        for (const authorId of newAuthorIds) {
            await client.query(`INSERT INTO public."book_author" ("isbn_book","id_author") VALUES ('${newIsbn}','${authorId}');`);
        }
        res.status(201);
        res.send("Kniha vytvořena");
    }
    else{
        res.status(409);
        res.send("Kniha již existuje");
    }
});

app.delete("/book/:id", async (req, res) => {
    await client.query(`DELETE FROM public."book" WHERE "isbn" = '${req.params.id}';`)
    res.status(200);
    res.send("Knihovna smazána");
});

app.listen(8080, () => {
    console.log("Server loaded.");
});