import React, { useState } from 'react';
import axios from 'axios';

function Inscription() {
  const [Nom_Utilisateur, setNom] = useState('');
  const [Email, setEmail] = useState('');
  const [Mot_de_passe, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { Email, Mot_de_passe, Nom_Utilisateur };

    axios.post('http://localhost:3000/api/utilisateurs', data)
      .then(() => {
        console.log('Nouvel utilisateur ajouté');
      })
      .catch(error => console.error('Erreur lors de l\'ajout de l\'utilisateur:', error));
  };

  return (
    <div>
      Inscription
      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" required value={Nom_Utilisateur} onChange={(e) => setNom(e.target.value)} />
        <label>Email</label>
        <input type="email" required value={Email} onChange={(e) => setEmail(e.target.value)} />
        <label>Mot de passe</label>
        <input type="password" required value={Mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
        <button type="submit">Inscription</button>
      </form>
    </div>
  );
}

export default Inscription;
