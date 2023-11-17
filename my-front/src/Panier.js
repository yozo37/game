// Panier.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Panier() {
  const [jeuxLoues] = useState([]);
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    // Vous pouvez supprimer cette fonction fetchJeuxLoues si vous ne souhaitez pas charger les jeux loués au montage du composant.
  }, []);

  const ajouterAuPanier = async (jeu) => {
    try {
      // Remplacez l'ID de l'utilisateur par la valeur correcte
      const ID_Utilisateur = 1; // À remplacer par l'ID de l'utilisateur actuel

      // Supposons que vous souhaitez ajouter une note et un commentaire par défaut
      const Note = 0;
      const Commentaire = '';

      // Envoyez la requête POST pour louer le jeu
      await axios.post('http://localhost:3000/api/locations/:id', {
        ID_Utilisateur,
        ID_Jeu: jeu.ID_jeu,
        Note,
        Commentaire,
      });

      // Mise à jour de l'état du panier
      setPanier([...panier, jeu]);

      // Stockez le panier dans le localStorage
      localStorage.setItem('panier', JSON.stringify([...panier, jeu]));
    } catch (error) {
      console.error('Erreur lors de la location du jeu :', error);
    }
  };

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jeuxLoues.map((jeuLoue) => (
            <tr key={jeuLoue.ID_jeu}>
              <td>{jeuLoue.ID_jeu}</td>
              <td>{jeuLoue.Nom_jeu}</td>
              <td>{jeuLoue.Genre}</td>
              <td>{jeuLoue.Date_sortie}</td>
              <td>
                <button onClick={() => ajouterAuPanier(jeuLoue)}>Ajouter au panier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Contenu du Panier</h3>
      <ul>
        {panier.map((jeuPanier) => (
          <li key={jeuPanier.ID_jeu}>{jeuPanier.Nom_jeu}</li>
        ))}
      </ul>
    </div>
  );
}

export default Panier;
