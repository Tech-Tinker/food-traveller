import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './css/SearchBar.css';
import Search from '../../assets/search.svg';
import ViewOptions from './ViewOptions';
import axios from 'axios';

function SearchBar({ searchEvent, map, setMarker, scrollToSearchBar }) {
  const [searchMessage, setSearchMessage] = useState('');
  const [search, setSearch] = useState('');
  // eslint-disable-next-line
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (map && query) {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?language=es&access_token=${mapboxgl.accessToken}`)
        .then(response => response.json())
        .then(data => {
          const features = data.features;

          const filteredResults = features.filter(feature =>
            feature.place_type.includes('country') || feature.place_type.includes('country')
          );

          if (filteredResults.length === 1) {
            handleResultClick(filteredResults[0]);
          } else {
            setSearchResults(filteredResults);
          }
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

    setSearchResults([]);
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

  const handleButtonSearch = (value) => {
    handleSearch(value)
    axios.post(`http://localhost:8000/api/search?query=${value}`).then(res => {
      if (res.data.message) {
        setSearchMessage(res.data.message);
        searchEvent([]);
      } else {
        setSearchMessage('');
        searchEvent(res.data);
      }
      if (scrollToSearchBar) {
        scrollToSearchBar();
      }
    }).catch(function (err) {
      console.log('error', err)
    });
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleButtonSearch(search);
    }
  };

  return (
    <>
      <div className='container-search-map'>
        <input
          className='search-map'
          type="text"
          placeholder="Buscar por país o receta..."
          name="query"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className='btn-search' onClick={() => handleButtonSearch(search)}>
          <img src={Search} alt="Search" />
        </button>
      </div>

      <div>
        {searchMessage && <div className="message error-text fw-bold text-center">{searchMessage}</div>}
        <ul className="country-list">
          {searchResults.map((result, index) => (
            <li
              key={index}
              onClick={() => handleResultClick(result)}
              className="country-list-item"
            >
              {result.place_name}
            </li>
          ))}
        </ul>
      </div>

      <ViewOptions onViewOptionChange={flyToContinent} />

    </>
  );
}

export default SearchBar;
