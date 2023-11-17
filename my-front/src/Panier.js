import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Panier() {
  //  pour stocker les jeux loués
  const [jeuxLoues, setJeuxLoues] = useState([]);

  // ID de l'utilisateur
  const ID_Utilisateur = 1;

  useEffect(() => {
    // Fonction qui récupérer les jeux loués
    const fetchJeuxLoues = async () => {
      try {
        // Envoie une requête GET pour récupérer les jeux loués de l'utilisateur
        const response = await axios.get(`http://localhost:3000/api/locations/${ID_Utilisateur}`);

        // Met à jour l'état avec les jeux loués
        setJeuxLoues(response.data);

        // Stocke les jeux loués dans le localStorage 
        localStorage.setItem('jeuxLoues', JSON.stringify(response.data));
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux loués :', error);
      }
    };

    // Appelle la fonction de récupération des jeux loués
    fetchJeuxLoues();
  }, [ID_Utilisateur]); //  mise à jour lorsque l'ID de l'utilisateur change

  return (
    <div>
      <h2>Panier</h2>
      {/* Tableau pour afficher les jeux loués */}
      <table>
        <thead>
          <tr>
            <th>Nom du Jeu</th>
            <th>Genre</th>
            <th>Date de sortie</th>
          </tr>
        </thead>
        <tbody>
          {/*  Parcours toute ma liste pour renvoyer les jeux loué */}
          {jeuxLoues.map((jeuLoue) => (
            <tr key={jeuLoue.ID_jeu}>
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
