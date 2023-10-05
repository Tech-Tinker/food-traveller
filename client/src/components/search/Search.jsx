import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get('/api/recipes');
      onSearch(response.data);
    } catch (error) {
      console.error('Error al buscar:', error);
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Buscar recetas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default Search;
