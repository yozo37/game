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

app.get('/api/recherche/:nom', async (req, res) => {
    console.log("Lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("Lancement de la requête");
    
    try {
        // Utilisez le nom du jeu comme paramètre dans la requête SQL
        const rows = await conn.query("SELECT * FROM jeu WHERE Nom_jeu = ?", [req.params.nom]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Erreur lors de l'exécution de la requête :", err);
        res.status(500).send("Erreur serveur");
    } finally {
        // N'oubliez pas de libérer la connexion une fois la requête terminée
        conn.release();
    }
});

app.get('/api/utilisateurs/', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM utilisateurs");
    console.log(rows);
    res.status(200).json(rows);
});
app.get('/api/utilisateurs/:id', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM Utilisateurs WHERE ID_Utilisateur = ?", [req.params.id]);
    console.log(rows);
    res.status(200).json(rows);
})

app.post('/api/utilisateurs/', async (req, res) => {
    console.log(req.body);

    try {
        const { Nom_Utilisateur, Email, Mot_de_passe } = req.body;

        if (!Nom_Utilisateur || !Email || !Mot_de_passe) {
            return res.status(400).json({ error: 'Nom_Utilisateur, email, and Mot_de_passe are required.' });
        }

        const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);

        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Utilisateurs (Nom_Utilisateur, Email, Mot_de_passe) VALUES (?, ?, ?)', [Nom_Utilisateur, Email, hashedPassword]);

        const IDUtilisateur = Number(result.insertId);

        await conn.release();

        res.status(201).json({ ID_Utilisateur: IDUtilisateur, message: 'User created successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { Nom_Utilisateur, Mot_de_passe } = req.body;

        if (!Nom_Utilisateur || !Mot_de_passe) {
            return res.status(400).json({ error: 'Nom_Utilisateur and Mot_de_passe are required.' });
        }

        const conn = await pool.getConnection();
        try {
            const result = await conn.query('SELECT * FROM Utilisateurs WHERE Nom_Utilisateur = ?', [Nom_Utilisateur]);

            console.log('Query Result:', result);

            if (result.length === 0) {
                return res.status(401).json({ error: 'Invalid Nom_Utilisateur or Mot_de_passe.' });
            }

            const user = result[0];
            console.log('Entered Password:', Mot_de_passe);
            console.log('Stored Hashed Password:', user.Mot_de_passe);

            const isPasswordValid = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);

            console.log('Password Comparison Result:', isPasswordValid);

            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid Nom_Utilisateur or Mot_de_passe.' });
            }

            res.status(200).json({ message: 'Login successful.' });
        } finally {
            await conn.release();
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/api/locations/', async (req, res) => {
    console.log("lancement de la connexion");
    const conn = await pool.getConnection();
    console.log("lancement de la requete");
    const rows = await conn.query("SELECT * FROM locations");
    console.log(rows);
    res.status(200).json(rows);
});
// app.post('/api/locations/:id', async (req, res) => {
//     try {
//       // Supposons que vous recevez ces données du front-end
//       const { ID_Utilisateur, ID_Jeu, Note, Commentaire } = req.body;
  
//       // Ajoutez ces données à la table locations dans la base de données
//       await pool.query(
//         'INSERT INTO locations (ID_Utilisateur, ID_Jeu, Note, Commentaire) VALUES (?, ?, ?, ?)',
//         [ID_Utilisateur, ID_Jeu, Note, Commentaire]
//       );
  
//       res.status(201).json({ message: 'Jeu loué avec succès' });
//     } catch (error) {
//       console.error('Erreur lors de la location du jeu :', error);
//       res.status(500).json({ message: 'Erreur lors de la location du jeu' });
//     }
//   });
  


app.listen(3000, () => {
    console.log("Serveur a l'ecoute");
});