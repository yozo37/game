import React, { useState } from 'react';
import axios from 'axios';

function Connexion() {
  // Variables d'état pour stocker les valeurs des champs d'entrée email et mot de passe
  const [Nom_Utilisateur, setnom] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crée un objet de données avec l'email et le mot de passe
    const data = { Nom_Utilisateur, Mot_de_passe };

    try {
      // Effectue une requête POST vers le point d'API spécifié avec les données de l'utilisateur
      const response = await axios.post('http://localhost:3000/api/login', data);
      
      // En cas de réussite, affiche un message dans la console et stocke les données de l'utilisateur dans le stockage local
      console.log('Utilisateur connecté');
      localStorage.setItem('utilisateurConnecte', JSON.stringify(response.data));
    } catch (error) {
      // En cas d'erreur lors du processus de connexion, affiche l'erreur dans la console
      console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    }
  };

 
  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Nom :</label>
          <input type="nom" required value={Nom_Utilisateur} onChange={(e) => setnom(e.target.value)} />
        </p>
        <p>
          <label>Mot de passe : </label>
          <input type="password" required value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
        </p>
        <p>
          <button type="submit">Connexion</button>
        </p>
      </form>
    </div>
  );
}


export default Connexion;
