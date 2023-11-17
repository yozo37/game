import React, { useState } from 'react';
import axios from 'axios';

function Connexion() {
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { Email, Mot_de_passe };

    axios.post('http://localhost:3000/api/login', data)
      .then(() => {
        console.log('Utilisateur connecté');
        // Ajoutez ici le code pour gérer la connexion réussie, par exemple, redirection vers une nouvelle page.
      })
      .catch(error => console.error('Erreur lors de la connexion de l\'utilisateur:', error));
  };

  return (
    <div>
      Connexion
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" required value={Email} onChange={(e) => setEmail(e.target.value)} />
        <label>Mot de passe</label>
        <input type="password" required value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default Connexion;
