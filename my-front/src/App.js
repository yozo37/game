import './App.css';
import { BrowserRouter as  Route, Routes, Link } from 'react-router-dom';
import Accueil from './Inscription'; // Assurez-vous d'importer votre composant Accueil depuis le bon chemin

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/Accueil">Accueil</Link>
      </nav>

      <Routes>
        <Route path="/Accueil" element={<Accueil />} />
      </Routes>
    </div>
  );
}

export default App;

