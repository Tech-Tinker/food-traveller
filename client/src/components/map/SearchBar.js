import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';

function SearchBar({ map, setMarker }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (map && query) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const features = data.features;
          setSearchResults(features);
        });
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (result) => {
    const [lng, lat] = result.center;
    
    map.flyTo({ center: [lng, lat] });

    if (setMarker) {
      setMarker(marker => {
        if (marker) {
          marker.remove();
        }
        
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
        onChange={(e) => handleSearch(e.target.value)}
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
