import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import pg from "pg";

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

//region
app.get("/region", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM region;'));
});

//library
app.get("/library", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT "library"."name" AS "library_name","adress","region"."name" AS "region_name" FROM "library" JOIN "region" ON "library"."id_region" = "region"."id";'));
});

app.post("/library", async (req, res) => {
    let regionId = await client.query('SELECT id FROM public."region" WHERE "name" = $1 LIMIT 1;',[req.body.region]);
    await client.query(`INSERT INTO public."library" ("name","adress","id_region") VALUES ('${req.body.name}','${req.body.address}','${regionId.rows[0].id}');`);
    res.status(201);
    res.send("Knihovna vytvořena");
});

//genre
app.get("/genre", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM genre;'));
});

//author
app.get("/author", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM author;'));
});

//book
app.get("/book", async (req, res) => {
    res.status(200);
    res.send(await client.query('SELECT * FROM book;'));
});

app.listen(8080, () => {
    console.log("Server loaded.");
});