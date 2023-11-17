// Jeu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Jeu() {
  const [jeux, setJeux] = useState([]);
  const [filteredJeux, setFilteredJeux] = useState([]);
  const [nomRecherche, setNomRecherche] = useState('');

  useEffect(() => {
    const fetchJeux = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jeu');
        setJeux(response.data);
        setFilteredJeux(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux :', error);
      }
    };

    fetchJeux();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/recherche/${nomRecherche}`);
      setFilteredJeux(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  const louerJeu = async (jeuId) => {
    try {
      // Envoyez la requête POST pour louer le jeu avec l'ID du jeu
      await axios.post(`http://localhost:3000/api/locations/${jeuId}`);
      // Vous pouvez ajouter un message de confirmation ou mettre à jour l'état si nécessaire
      console.log('Jeu loué avec succès!');
    } catch (error) {
      console.error('Erreur lors de la location du jeu :', error);
    }
  };

  return (
    <div>
      <h2>Liste des Jeux</h2>
      <div>
        <input
          type="text"
          placeholder="Rechercher par nom"
          value={nomRecherche}
          onChange={(e) => setNomRecherche(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom du Jeu</th>
            <th>Genre</th>
            <th>Date de sortie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody> 
          {filteredJeux.map((jeu) => (
            <tr key={jeu.ID_jeu}>
              <td>{jeu.Nom_jeu}</td>
              <td>{jeu.Genre}</td>
              <td>{jeu.Date_sortie}</td>
              <td>
                <Link to="/Panier">
                  <button onClick={() => louerJeu(jeu.ID_jeu)}>Louer le jeu</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Jeu;

