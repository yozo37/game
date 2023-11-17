// Jeu.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Jeu() {
  const [jeux, setJeux] = useState([]);
  const [filteredJeux, setFilteredJeux] = useState([]);

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

  const handleSearch = (searchText) => {
    const filtered = jeux.filter((jeu) => jeu.ID_jeu.includes(searchText));
    setFilteredJeux(filtered);
  };

  return (
    <div>
      <h2>Liste des Jeux</h2>
      <Navbar onSearch={handleSearch} />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom du Jeu</th>
            <th>Genre</th>
            <th>Date de sortie</th>
          </tr>
        </thead>
        <tbody>
          {filteredJeux.map((jeu) => (
            <tr key={jeu.ID_jeu}>
              <td>{jeu.ID_jeu}</td>
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
