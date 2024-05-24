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
    res.send(await client.query('SELECT * FROM region'));
});

//library
app.get("/library", async (req, res) => {
    res = await client.query('SELECT * FROM library');
});

//genre
app.get("/genre", async (req, res) => {
    res = await client.query('SELECT * FROM genre');
});

//author
app.get("/author", async (req, res) => {
    res = await client.query('SELECT * FROM author');
});

//book
app.get("/book", async (req, res) => {
    res.send(await client.query('SELECT * FROM book'));
});

app.listen(8080, () => {
    console.log("Server loaded.");
});