import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';



const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/recipes?query=${query}`);
      if (response.data.length === 0) {
        setErrorMessage('No se encontraron recetas con las características solicitadas');
      } else {
        setErrorMessage('');
      }
      onSearch(response.data);
    } catch (error) {
      console.error('Error al buscar:', error);
      setErrorMessage('Ocurrió un error al buscar las recetas.');
    }
  };

  return (
    <div className="search-div">
      <div className="searchBar">
        <input className="fw-bold fs-5 label-text text"
          type="text"
          placeholder="Buscar recetas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='searchbtn' onClick={handleSearch}>Buscar</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Search;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Search = ({ onSearch }) => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`/api/search?query=${query}`);
//       setResults(response.data);
//       onSearch(response.data); // Llama a la función de callback para pasar los resultados al componente padre (Result en este caso)
//     } catch (error) {
//       console.error('Error al buscar:', error);
//     }
//   };

//   return (
//     <div className="searchBar">
//       <input
//         type="text"
//         placeholder="Buscar recetas..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={handleSearch}>Buscar</button>

//       {/* Muestra los resultados de la búsqueda */}
//       <ul>
//         {results.map((result) => (
//           <li key={result.id}>{result.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Search;