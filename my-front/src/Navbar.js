// Navbar.js
import React, { useState } from 'react';

function Navbar({ onSearch }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Rechercher</button>
    </div>
  );
}

export default Navbar;
