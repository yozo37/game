import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inscription from './Inscription.js';
import Connexion from './Connexion.js';
import Jeu from './Jeu.js';
import Header from './Header.js';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/jeu" element={<Jeu />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

