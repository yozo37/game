import React, { useState } from 'react';
import axios from 'axios';
import './connexion.css';

function Connexion() {

  const containerStyle = {
    textAlign: 'center',
    margin: '20px auto', 
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '300px',
  };

  // Style pour le formulaire
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  // Style pour les champs de formulaire
  const inputStyle = {
    margin: '10px 0',
    padding: '8px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  };

  // Style pour le bouton
  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  
  // Variables d'état pour stocker les valeurs des champs d'entrée email et mot de passe
  const [Nom_Utilisateur, setNom] = useState('');
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
      console.log('Utilisateur connecté', response.data);
      localStorage.setItem('utilisateurConnecte', JSON.stringify(response.data));
      console.log('Données utilisateur stockées dans le localStorage:', response.data);
    } catch (error) {
      // En cas d'erreur lors du processus de connexion, affiche l'erreur dans la console
      console.error("Erreur lors de la connexion de l'utilisateur :", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Champ pour le nom d'utilisateur */}
        <p>
          <label>Nom d'utilisateur :</label>
          <input type="text" required value={Nom_Utilisateur} onChange={(e) => setNom(e.target.value)} style={inputStyle} />
        </p>
        {/* Champ pour le mot de passe */}
        <p>
          <label>Mot de passe :</label>
          <input type="password" required value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} style={inputStyle} />
        </p>
        {/* Bouton de soumission du formulaire */}
        <p>
          <button type="submit" style={buttonStyle}>Connexion</button>
        </p>
      </form>
    </div>
  );
}

export default Connexion;
