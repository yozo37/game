import React, { useState } from 'react';
import axios from 'axios';

export default function Inscription() {
  // Constantes pour le formulaire d'inscription
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [mot_de_passe, setMotDePasse] = useState('');

  // Fonction pour le formulaire d'inscription
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { nom, email, mot_de_passe };
    console.log(data);

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
        <input type="text" required value={nom} onChange={(e) => setNom(e.target.value)} />
        <label>Email</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Mot de passe</label>
        <input type="password" required value={mot_de_passe} onChange={(e) => setMotDePasse(e.target.value)} />
        <button type="submit">Inscription</button>
      </form>
    </div>
  );
}
