import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const headerStyle = {
    backgroundColor: 'yellow',
    padding: '10px',
    marginBottom: '20px',
  };

  return (
    <header style={headerStyle}>
      <nav>
        <ul>
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
