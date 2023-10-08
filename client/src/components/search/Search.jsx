import React, { useState } from 'react';
import './Search.css';
import { searchService } from '../../services/ApiServices';

const Search = () => {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchService(query);
      if (results.length === 0) {
        setErrorMessage('No se encontraron coincidencias');
      } else {
        setErrorMessage('');
      }
      setSearchResults(results);
    } catch (error) {
      console.error('Error al buscar:', error);
      setErrorMessage('Ocurrió un error al buscar las recetas.');
    }
  };

  return (
    <div className="search-div">
      <div className="searchBar">
        <input
          className="fw-bold fs-5 label-text text"
          type="text"
          placeholder="Buscar recetas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='searchbtn' onClick={handleSearch}>Buscar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
