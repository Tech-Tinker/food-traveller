import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

function SearchBar({ map, setMarker }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Función para realizar la búsqueda y mostrar resultados en tiempo real
  const handleSearch = (query) => {
    setSearchQuery(query);

    if (map && query) {
      // Utiliza la API de geocodificación de Mapbox para buscar lugares
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const features = data.features;
          setSearchResults(features);
        });
    } else {
      setSearchResults([]); // Vaciar la lista de resultados si no hay consulta
    }
  };

  // Función para manejar la selección de un resultado
  const handleResultClick = (result) => {
    const [lng, lat] = result.center;
    
    // Centrar el mapa en la ubicación del resultado
    map.flyTo({ center: [lng, lat] });

    // Remover marcador existente si existe
    if (setMarker) {
      setMarker(marker => {
        if (marker) {
          marker.remove();
        }
        
        // Agregar marcador al lugar seleccionado
        const newMarker = new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .addTo(map);
        
        return newMarker;
      });
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar lugar"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)} // Realizar búsqueda en tiempo real
      />
      <button onClick={() => handleSearch(searchQuery)}>Buscar</button>
      <div>
        {/* Mostrar los resultados de la búsqueda */}
        <ul>
          {searchResults.map((result, index) => (
            <li
              key={index}
              onClick={() => handleResultClick(result)}
              style={{ cursor: 'pointer' }}
            >
              {result.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchBar;
