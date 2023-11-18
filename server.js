const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config(); // Charge les variables d'environnement depuis un fichier .env
let cors = require('cors');
const bcrypt = require('bcrypt');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATA,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
});

app.use(cors()); // Active CORS pour permettre les requêtes depuis n'importe quel domaine

//  pour récupérer tous les jeux
app.get('/api/jeu/', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM jeu");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//  pour rechercher un jeu par son nom
app.get('/api/recherche/:nom', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM jeu WHERE Nom_jeu = ?", [req.params.nom]);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Erreur lors de l'exécution de la requête :", err);
        res.status(500).send("Erreur serveur");
    } finally {
        conn.release();
    }
});

//  pour récupérer tous les utilisateurs
app.get('/api/utilisateurs/', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM utilisateurs");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//  pour récupérer un utilisateur par son ID
app.get('/api/utilisateurs/:id', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [user] = await conn.query("SELECT * FROM Utilisateurs WHERE ID_Utilisateur = ?", [req.params.id]);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//  pour créer un nouvel utilisateur
app.post('/api/utilisateurs/', async (req, res) => {
    try {
        
        const { Nom_Utilisateur, Email, Mot_de_passe } = req.body;

        // Vérification des données requises
        if (!Nom_Utilisateur || !Email || !Mot_de_passe) {
            return res.status(400).json({ error: 'Nom_Utilisateur, email, and Mot_de_passe are required.' });
        }

        // Hash du mot de passe
        const hashedPassword = await bcrypt.hash(Mot_de_passe, 10);

        const conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO Utilisateurs (Nom_Utilisateur, Email, Mot_de_passe) VALUES (?, ?, ?)', [Nom_Utilisateur, Email, hashedPassword]);

        const IDUtilisateur = Number(result.insertId);

        res.status(201).json({ ID_Utilisateur: IDUtilisateur, message: 'User created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//  pour l'authentification d'un utilisateur
app.post('/api/login', async (req, res) => {
    try {
        // Extraction des données du corps de la requête
        const { Nom_Utilisateur, Mot_de_passe } = req.body;

        // Vérification des données requises
        if (!Nom_Utilisateur || !Mot_de_passe) {
            return res.status(400).json({ error: 'Nom_Utilisateur and Mot_de_passe are required.' });
        }

        const conn = await pool.getConnection();

        try {
            const result = await conn.query('SELECT * FROM Utilisateurs WHERE Nom_Utilisateur = ?', [Nom_Utilisateur]);

            if (result.length === 0) {
                return res.status(401).json({ error: 'Invalid Nom_Utilisateur or Mot_de_passe.' });
            }

            const user = result[0];

            // Comparaison des mots de passe
            const isPasswordValid = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);

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

//  pour récupérer toutes les locations
app.get('/api/locations/', async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM locations");
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

//  pour supprimer un utilisateur par son ID
app.delete('/api/utilisateurs/:id', async (req, res) => {
    let conn;
    let id = req.params.id;

    try {
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Utilisateurs WHERE ID_Utilisateur = ?", [req.params.id]);
        res.status(200).json({ message: 'Utilisateur bien supprimé !' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur requête lors de la suppression !' });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});

//  pour supprimer une location par son ID
app.delete('/api/locations/:id', async (req, res) => {
    let conn;
    let id = req.params.id;

    try {
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Locations WHERE ID_locations = ?", [req.params.id]);
        res.status(200).json({ message: 'Location bien supprimée !' });
    } catch (err) {
        res.status(400).json({ message: 'Erreur requête lors de la suppression !' });
    } finally {
        if (conn) {
            conn.release();
        }
    }
});

// pour supprimer un jeu par son ID
app.delete('/api/jeu/:id', async (req, res) => {
    let conn;
    let id = req.params.id;

    try {
        conn = await pool.getConnection();
        const result = await conn.query("DELETE FROM Jeu WHERE ID_jeu = ?", [
            req.params.id]);
            res.status(200).json({ message: 'Jeu bien supprimé !' });
        } catch (err) {
            res.status(400).json({ message: 'Erreur requête lors de la suppression !' });
        } finally {
            if (conn) {
                conn.release();
            }
        }
    });
    
    // pour récupérer les locations d'un utilisateur par son ID
    app.get('/api/locations/:ID_Utilisateur', async (req, res) => {
        try {
            const conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM Locations WHERE ID_Utilisateur = ?", [req.params.ID_Utilisateur]);
            res.status(200).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } finally {
            if (conn) {
                conn.release();
            }
        }
    });
    
    // pour créer ou mettre à jour une location
    app.post('/locations/infos', async (req, res) => {
        const { jeuId, utilisateurId, notes, commentaire } = req.body;
    
        try {
            const conn = await pool.getConnection();
    
            // Récupération de la date actuelle
            const dateQuery = 'SELECT Date_Location FROM Locations WHERE ID_Jeu = ? ORDER BY Date_Location DESC LIMIT 1';
            const dateResult = await conn.query(dateQuery, [jeuId]);
    
            // Utilisation de la date actuelle ou création d'une nouvelle date
            const dateDebut = dateResult.length > 0 ? dateResult[0].Date_Location : new Date();
            const dateFin = dateResult.length > 0 ? dateResult[0].Date_Location : new Date();
    
            // Vérification de l'existence d'une location à la même date
            const existingRowQuery = 'SELECT * FROM Locations WHERE ID_Jeu = ? AND Date_Location = ?';
            const existingRowResult = await conn.query(existingRowQuery, [jeuId, dateDebut]);
    
            if (existingRowResult.length > 0) {
                res.status(409).json({ success: false, message: 'Location already exists' });
            } else {
                // Insertion d'une nouvelle location
                const insertQuery = 'INSERT INTO Locations (Date_Location, ID_Jeu, ID_Utilisateur, Note, Commentaire) VALUES (?, ?, ?, ?, ?)';
                const insertResult = await conn.query(insertQuery, [dateDebut, jeuId, utilisateurId, notes, commentaire]);
                res.status(201).json({ success: true, message: 'Location created successfully' });
            }
        } catch (error) {
            console.error('Error creating or updating location:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } finally {
            if (conn) {
                conn.release();
            }
        }
    });
    
    // Démarrage du serveur sur le port 3000
    app.listen(3000, () => {
        console.log("Serveur à l'écoute sur le port 3000");
    });
        