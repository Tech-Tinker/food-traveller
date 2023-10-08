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