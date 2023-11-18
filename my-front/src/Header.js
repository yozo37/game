import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    backgroundColor: '#ECF39E',
    padding: '10px',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const h1Style = {
    margin: 0,
    color: '#333',
  };

  const listStyle = {
    textAlign: 'left',
    paddingLeft: 0,
  };

  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>Accueil</h1>
      <nav>
        <ul style={listStyle}>
          <li>
            <Link to="/inscription">Inscription</Link>
          </li>
          <li>
            <Link to="/connexion">Connexion</Link>
          </li>
          <li>
            <Link to="/jeu">Liste des Jeux</Link>
          </li>
          <li>
            <Link to="/panier">Panier</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;


