// Panier.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Panier() {
  const [jeuxLoues, setJeuxLoues] = useState([]);
  const ID_Utilisateur = 1; // Remplacez par l'ID de l'utilisateur actuel

  useEffect(() => {
    const fetchJeuxLoues = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api//${ID_Utilisateur}`);
        setJeuxLoues(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux loués :', error);
      }
    };

    fetchJeuxLoues();
  }, [ID_Utilisateur]); // Ajoutez ID_Utilisateur comme dépendance pour déclencher l'effet lorsque l'ID change

  return (
    <div>
      <h2>Panier</h2>
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
          {jeuxLoues.map((jeuLoue) => (
            <tr key={jeuLoue.ID_jeu}>
              <td>{jeuLoue.ID_jeu}</td>
              <td>{jeuLoue.Nom_jeu}</td>
              <td>{jeuLoue.Genre}</td>
              <td>{jeuLoue.Date_sortie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Panier;
