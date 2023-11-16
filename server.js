const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
let cors = require('cors');
const bcrypt = require('bcrypt');
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

app.post('/api/utilisateurs/', async (req, res) => {
    console.log(req.body);

    try {
        const { Nom_Utilisateur, Email, Mot_de_passe } = req.body;

        if (!Nom_Utilisateur || !Email || !Mot_de_passe) {
            return res.status(400).json({ error: 'Nom_Utilisateur, email, and Mot_de_passe are required.' });
        }

        const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);

        const conn = await pool.getConnection();
        await conn.beginTransaction();

        try {
            const result = await conn.query('INSERT INTO Utilisateurs (Nom_Utilisateur, Email, Mot_de_passe) VALUES (?, ?, ?)', [Nom_Utilisateur, Email, hashedPassword]);

            const IDUtilisateur = Number(result.insertId);

            await conn.commit();

            res.status(201).json({ ID_Utilisateur: IDUtilisateur, message: 'User created successfully.' });
        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            await conn.release();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(3000, () => {
    console.log("Serveur a l'ecoute");
});