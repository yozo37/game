import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function Inscription() {
  // pour stocker les valeurs du formulaire
  const [Nom_Utilisateur, setNom] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');
  const [Email, setEmail] = useState('');

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crée un objet avec les données du formulaire
    const data = { Mot_de_passe, Nom_Utilisateur, Email };

    try {
      // Envoie une requête POST pour créer un nouvel utilisateur
      await axios.post('http://localhost:3000/api/utilisateurs', data);
      console.log('Nouvel utilisateur ajouté');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };

  // Création d'un formulaire stylisé
  return (
    <div className="inscription-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit} className="inscription-form">
        {/* Champ pour le nom */}
        <div className="form-group">
          <label htmlFor="nom">Nom :</label>
          <input type="text" id="nom" required value={Nom_Utilisateur} onChange={(e) => setNom(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" required value={Email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      
        <div className="form-group">
          <label htmlFor="motDePasse">Mot de passe :</label>
          <input type="password" id="motDePasse" required value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
        </div>
      
        <div className="form-group">
          <button type="submit">Soumettre</button>
        </div>
      </form>
    </div>
  );
}

export default Inscription;