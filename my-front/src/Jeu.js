
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Jeu() {
  //  pour stocker la liste des jeux et le panier de l'utilisateur
  const [jeux, setJeux] = useState([]);
  const [panier, setPanier] = useState([]);

  // Utilisation de useEffect pour effectuer une requête au chargement du composant
  useEffect(() => {
    const fetchJeux = async () => {
      try {
        // Requête GET pour obtenir la liste des jeux depuis l'API
        const response = await axios.get('http://localhost:3000/api/jeu');
        setJeux(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des jeux :', error);
      }
    };

    fetchJeux();
  }, []); 

  // Fonction pour ajouter un jeu au panier
  const ajouterAuPanier = (jeu) => {
    setPanier([...panier, jeu]);
  };

  // Fonction pour louer les jeux dans le panier
  const louerJeux = async () => {
    try {
      // Récupération des données de l'utilisateur connecté depuis le localStorage
      const utilisateurData = JSON.parse(localStorage.getItem('utilisateurConnecte'));

      // Vérification de l'existence de l'utilisateur et de son ID
      if (!utilisateurData || !utilisateurData.ID_Utilisateur) {
        console.error("ID de l'utilisateur non trouvé. Veuillez vous connecter.");
        return;
      }

      const ID_Utilisateur = utilisateurData.ID_Utilisateur;

      // Requête GET pour obtenir les détails de l'utilisateur depuis l'API
      const userResponse = await axios.get(`http://localhost:3000/api/utilisateurs/${ID_Utilisateur}`);
      const user = userResponse.data;

      // Suite de la fonction louerJeux
      const dateLocation = new Date().toISOString().slice(0, 10);

      // Requête POST pour enregistrer la location dans la base de données
      const response = await axios.post('http://localhost:3000/api/locations/infos', {
        jeuId: panier.map((jeu) => jeu.ID_jeu),
        utilisateurId: ID_Utilisateur,
        notes: null,
        commentaire: null,
      });

      // Vérification du succès de la location
      if (response.data.success) {
        setPanier([]);
        console.log('Jeux loués avec succès!');
        // Redirection vers la page du panier si nécessaire
      } else {
        console.log('Erreur lors de la location des jeux :', response.data.message);
      }
    } catch (error) {
      console.error('Erreur lors de la location des jeux :', error);
    }
  };


  return (
    <div>
      <h2>Liste des Jeux</h2>
      <table>
        <thead>
          <tr>
            <th>Nom du Jeu</th>
            <th>Genre</th>
            <th>Date de sortie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jeux.map((jeu) => (
            <tr key={jeu.ID_jeu}>
              <td>{jeu.Nom_jeu}</td>
              <td>{jeu.Genre}</td>
              <td>{new Date(jeu.Date_sortie).toLocaleDateString()}</td>
              <td>
                <button onClick={() => ajouterAuPanier(jeu)}>Ajouter au panier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h2>Panier</h2>
        <table>
          <thead>
            <tr>
              <th>Nom du Jeu</th>
              <th>Genre</th>
              <th>Date de sortie</th>
            </tr>
          </thead>
          <tbody>
            {panier.map((jeuPanier) => (
              <tr key={jeuPanier.ID_jeu}>
                <td>{jeuPanier.Nom_jeu}</td>
                <td>{jeuPanier.Genre}</td>
                <td>{new Date(jeuPanier.Date_sortie).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Utilisation de Link pour la navigation vers la page du panier */}
        <Link to="/panier">
          <button onClick={louerJeux}>Louer les jeux</button>
        </Link>
      </div>
    </div>
  );
}

// Export du composant Jeu
export default Jeu;
