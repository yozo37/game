// Jeu.js (votre composant React)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
          </tr>
        </thead>
        <tbody>
          {filteredJeux.map((jeu) => (
            <tr key={jeu.ID_jeu}>
              <td>{jeu.Nom_jeu}</td>
              <td>{jeu.Genre}</td>
              <td>{jeu.Date_sortie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Jeu;


