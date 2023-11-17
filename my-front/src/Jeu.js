import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Jeu() {
  const [jeux, setJeux] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer tous les jeux depuis l'API
    const fetchJeux = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jeu');
        setJeux(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux :', error);
      }
    };

    // Appeler la fonction pour récupérer les jeux lors du chargement du composant
    fetchJeux();
  }, []); // Le tableau vide en tant que dépendance signifie que cela ne se déclenchera qu'une fois après le montage initial

  return (
    <div>
      <h2>Liste des Jeux</h2>
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
          {jeux.map((jeu) => (
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

