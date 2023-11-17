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

app.get('/api/utilisateurs', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM utilisateurs");
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

app.post('/api/connexion', async (req, res) => {
    try {
      const { ID_utilisateur } = req.body;
  
      if (!ID_utilisateur) {
        return res.status(400).json({ error: 'User ID is required.' });
      }
  
      // Vérifier si l'utilisateur avec cet ID existe dans la base de données
      const conn = await pool.getConnection();
      const result = await conn.query('SELECT * FROM Utilisateurs WHERE ID_Utilisateur = ?', [ID_utilisateur]);
  
      if (result.length === 0) {
        return res.status(404).json({ error: 'User not found.' });
      }
  
      // Ajoutez ici le code pour gérer la connexion réussie, par exemple, retourner un message de réussite.
      res.status(200).json({ message: 'User is connected.' });
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });
app.get('/api/locations', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM locations");
    console.log(rows);
    res.status(200).json(rows);
});
app.post('/api/locations/:id', async (req, res) => {
    try {
      const ID_Utilisateur = req.params.id; // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
      const { ID_Jeu, Note, Commentaire,Date_Location } = req.body; // Récupérer d'autres données depuis le corps de la requête
  
      // Vérifier si l'utilisateur et le jeu existent avant de procéder à la location
      // (vous pouvez ajouter des vérifications supplémentaires selon vos besoins)
  
      // Insérer la nouvelle location dans la table "locations"
      const result = await pool.query(
        'INSERT INTO locations (Date_Location, ID_Jeu, ID_Utilisateur, Note, Commentaire) VALUES (CURDATE(), ?, ?, ?, ?)',
        [ID_Jeu, ID_Utilisateur, Note, Commentaire,Date_Location]
      );
  
      // Envoyer une réponse réussie
      res.status(201).json({ message: 'Location réussie', location: result.insertId });
    } catch (error) {
      console.error('Erreur lors de la location du jeu :', error);
      res.status(500).json({ message: 'Erreur lors de la location du jeu' });
    }
  });
  


app.listen(3000, () => {
    console.log("Serveur a l'ecoute");
});