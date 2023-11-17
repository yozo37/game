import React, { useState } from 'react';
import axios from 'axios';

function Inscription() {
  //  pour stocker les valeurs du formulaire
  const [Nom_Utilisateur, setNom] = useState('');
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    // Crée un objet avec les données du formulaire
    const data = { Email, Mot_de_passe, Nom_Utilisateur };

    try {
      // Envoie une requête POST pour créer un nouvel utilisateur
      await axios.post('http://localhost:3000/api/utilisateurs', data);
      console.log('Nouvel utilisateur ajouté');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };
// Creation d'un formulaire
  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ pour le nom */}
        <p>
          <label>Nom :</label>
          <input type="text" required value={Nom_Utilisateur} onChange={(e) => setNom(e.target.value)} />
        </p>
        {/* Champ pour l'email */}
        <p>
          <label>Email :</label>
          <input type="email" required value={Email} onChange={(e) => setEmail(e.target.value)} />
        </p>
        {/* Champ pour le mot de passe */}
        <p>
          <label>Mot de passe :</label>
          <input type="password" required value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
        </p>
        {/* Bouton de soumission du formulaire */}
        <p>
          <button type="submit">Soumettre</button>
        </p>
      </form>
    </div>
  );
}

export default Inscription;

