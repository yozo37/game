// Jeu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Jeu() {
  // pour stocker la liste complète des jeux, les jeux filtrés et le terme de recherche
  const [jeux, setJeux] = useState([]);
  const [filteredJeux, setFilteredJeux] = useState([]);
  const [nomRecherche, setNomRecherche] = useState('');

  //chargement initial pour récupérer la liste complète des jeux depuis l'API
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

  // Fonction pour effectuer la recherche en fonction du nom du jeu
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/recherche/${nomRecherche}`);
      setFilteredJeux(response.data);
    } catch (error) {
      console.error('Erreur lors de la recherche :', error);
    }
  };

  // Fonction pour louer un jeu en envoyant une requête POST à l'API avec l'ID du jeu
  const louerJeu = async (jeuId) => {
    try {
      await axios.post(`http://localhost:3000/api/locations/${jeuId}`);
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

