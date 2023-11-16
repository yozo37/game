const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
let cors = require('cors');
// const bcrypt = require('bcrypt');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database:process.env.DB_DATA ,
    user:process.env.DB_USER ,
    password:process.env.DB_PWD ,
});
app.use(cors());

app.get('/api/jeu/', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM jeu");
    console.log(rows);
    res.status(200).json(rows);
});




app.listen(3000, () => {
    console.log("Serveur a l'ecoute");
});