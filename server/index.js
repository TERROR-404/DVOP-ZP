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
    res.send(await client.query('SELECT * FROM author;'));
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
    res.send(await client.query('SELECT * FROM book;'));
});


app.listen(8080, () => {
    console.log("Server loaded.");
});