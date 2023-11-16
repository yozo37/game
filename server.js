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
       const { email, mot_de_passe, nom, prenom } = req.body;

       if (!nom ||!email || !mot_de_passe ) {
           return res.status(400).json({ error: 'nom, email, password, are required.' });
       }

       const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

       const conn = await pool.getConnection();
       const result = await conn.query('INSERT INTO Utilisateurs (nom_Utilisateur, Email, Mot_de_passe) VALUES (?, ?, ?, ?)', [ nom,email,hashedPassword]);

       const utilisateurId = Number(result.insertId);

       res.status(201).json({ utilisateur_id: utilisateurId, message: 'User created successfully.' });
   } catch (err) {
       console.error(err);
       res.status(500).send('Internal Server Error');
   }
});


app.listen(3000, () => {
    console.log("Serveur a l'ecoute");
});