import React, { useState } from 'react';
import axios from 'axios';

function Connexion() {
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { Email, Mot_de_passe };

    try {
      const response = await axios.post('http://localhost:3000/api/login', data);
      console.log('Utilisateur connecté');
      
      // Stocker les informations de l'utilisateur dans le localStorage
      localStorage.setItem('utilisateurConnecte', JSON.stringify(response.data));
      
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label>Email :</label>
          <input type="email" required value={Email} onChange={(e) => setEmail(e.target.value)} />
        </p>
        <p>
          <label>Mot de passe :</label>
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
