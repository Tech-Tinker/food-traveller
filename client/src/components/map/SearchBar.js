import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './css/SearchBar.css';
import Search from '../../assets/search.svg';
import ViewOptions from './ViewOptions';

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

          const filteredResults = features.filter(feature =>
            feature.place_type.includes('country') || feature.place_type.includes('country')
          );

          setSearchResults(filteredResults);
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

  const flyToContinent = (continent) => {
    let center;
    let zoomLevel = 2;

    switch (continent) {
      case 'africa':
        center = [8.6753, 9.0820];
        break;
      case 'america':
        center = [-95.7129, 37.0902];
        break;
      case 'asia':
        center = [95.7129, 37.0902];
        break;
      case 'europa':
        center = [14.4378, 50.0755];
        break;
      case 'oceania':
        center = [133.7751, -25.2744];
        break;
      default:
        return;
    }

    map.flyTo({ center, zoom: zoomLevel });
  };

  return (
    <div className='container-search-map'>
      <input
        className='search-map'
        type="text"
        placeholder="Buscar sitio, comida, ect..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />

      <button className='btn-search' onClick={() => handleSearch(searchQuery)}>
        <img src={Search} alt="Search" />
      </button>

      <div>
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

      <ViewOptions onViewOptionChange={flyToContinent} />
    </div>
  );
}

export default SearchBar;
