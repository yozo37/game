import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from './Inscription';
import Connexion from './Connexion';
import Jeu from './Jeu';
import Header from './Header';
import Panier from './Panier';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/jeu" element={<Jeu />} />
          <Route path="/panier" element={<Panier />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

