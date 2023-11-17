const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
let cors = require('cors');
const bcrypt = require('bcrypt');
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    database: process.env.DB_DATA,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
});

app.use(cors());

app.get('/api/jeu/', async (req, res) => {
    try {
        console.log("lancement de la connexion");
        const conn = await pool.getConnection();
        console.log("lancement de la requete");
        const rows = await conn.query("SELECT * FROM jeu");
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/recherche/:nom', async (req, res) => {
    try {
        console.log("Lancement de la connexion");
        const conn = await pool.getConnection();
        console.log("Lancement de la requête");
        const rows = await conn.query("SELECT * FROM jeu WHERE Nom_jeu = ?", [req.params.nom]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (err) {
        console.error("Erreur lors de l'exécution de la requête :", err);
        res.status(500).send("Erreur serveur");
    } finally {
        conn.release();
    }
});

app.get('/api/utilisateurs/', async (req, res) => {
    try {
        console.log("lancement de la connexion");
        const conn = await pool.getConnection();
        console.log("lancement de la requete");
        const rows = await conn.query("SELECT * FROM utilisateurs");
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/utilisateurs/:id', async (req, res) => {
    try {
        console.log("lancement de la connexion");
        const conn = await pool.getConnection();
        console.log("lancement de la requete");
        const rows = await conn.query("SELECT * FROM Utilisateurs WHERE ID_Utilisateur = ?", [req.params.id]);
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/utilisateurs/', async (req, res) => {
    try {
        console.log(req.body);
        const { Nom_Utilisateur, Email, Mot_de_passe } = req.body;

        if (!Nom_Utilisateur || !Email || !Mot_de_passe) {
            return res.status(400).json({ error: 'Nom_Utilisateur, email, and Mot_de_passe are required.' });
        }

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
            console.log('User Object:', user);
            console.log('Entered Password:', Mot_de_passe);
            console.log('Stored Hashed Password:', user.Mot_de_passe);

            const isPasswordValid = await bcrypt.compare(Mot_de_passe, user.Mot_de_passe);

            console.log('Password Comparison Result:', isPasswordValid);

            if (!isPasswordValid) {
                console.error('Password comparison failed. Details:', {
                    enteredPassword: Mot_de_passe,
                    storedPassword: user.Mot_de_passe,
                });
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
    try {
        console.log("lancement de la connexion");
        const conn = await pool.getConnection();
        console.log("lancement de la requete");
        const rows = await conn.query("SELECT * FROM locations");
        console.log(rows);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.delete('/api/utilisateurs/:id', async (req, res) => {
    let conn
    let id = req.params.id
    console.log(id);
    try {
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requête DELETE")
        const result = await conn.query("DELETE * FROM Utilisateurs WHERE ID_Utilisateur = ?", [req.params.id]);
        res.status(200).json({ message: 'utilisateur bien supprimée !' })

    }
    catch (err) {
        res.status(400).json({ message: 'Erreur requête lors de la suppression !' })
    }
    finally {
        if (conn) {
            conn.release(); // Libérer la connexion à la base de données.
        }
    }
})
app.delete('/api/locations/:id', async (req, res) => {
    let conn
    let id = req.params.id
    console.log(id);
    try {
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requête DELETE")
        const result = await conn.query("DELETE * FROM Utilisateurs WHERE ID_locations = ?", [req.params.id]);
        res.status(200).json({ message: 'locations bien supprimée !' })

    }
    catch (err) {
        res.status(400).json({ message: 'Erreur requête lors de la suppression !' })
    }
    finally {
        if (conn) {
            conn.release(); // Libérer la connexion à la base de données.
        }
    }
})
app.delete('/api/locations/:id', async (req, res) => {
    let conn
    let id = req.params.id
    console.log(id);
    try {
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requête DELETE")
        const result = await conn.query("DELETE * FROM Utilisateurs WHERE ID_locations = ?", [req.params.id]);
        res.status(200).json({ message: 'locations bien supprimée !' })

    }
    catch (err) {
        res.status(400).json({ message: 'Erreur requête lors de la suppression !' })
    }
    finally {
        if (conn) {
            conn.release(); // Libérer la connexion à la base de données.
        }
    }
})
app.delete('/api/jeu/:id', async (req, res) => {
    let conn
    let id = req.params.id
    console.log(id);
    try {
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requête DELETE")
        const result = await conn.query("DELETE * FROM Utilisateurs WHERE ID_jeu = ?", [req.params.id]);
        res.status(200).json({ message: 'jeu bien supprimée !' })

    }
    catch (err) {
        res.status(400).json({ message: 'Erreur requête lors de la suppression !' })
    }
    finally {
        if (conn) {
            conn.release(); // Libérer la connexion à la base de données.
        }
    }
})


app.listen(3000, () => {
    console.log("Serveur a l'ecoute ") ;
});
