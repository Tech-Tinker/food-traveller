// import React, { useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import './SearchBar.css'
// import Searchmap from '../../assets/search.svg'

// function SearchBar({ map, setMarker }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = (query) => {
//     setSearchQuery(query);

//     if (map && query) {
//       fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`)
//         .then(response => response.json())
//         .then(data => {
//           const features = data.features;
//       //    setSearchResults(features);

          
//            const filteredResults = features.filter(feature =>
//             feature.place_type.includes('country') || feature.place_type.includes('country')
//           );

//          setSearchResults(filteredResults);
//         });
//     } else {
//       setSearchResults([]);
//     }
//   };

//   const handleResultClick = (result) => {
//     const [lng, lat] = result.center;
    
//     map.flyTo({ center: [lng, lat] });

//     if (setMarker) {
//       setMarker(marker => {
//         if (marker) {
//           marker.remove();
//         }
        
//         const newMarker = new mapboxgl.Marker()
//           .setLngLat([lng, lat])
//           .addTo(map);
        
//         return newMarker;
//       });
//     }
//   };

//   return (
//     <div className='container-search-map'>
//       <input className='search-map'
//         type="text"
//         placeholder="Buscar sitio, comida, ect..."
//         value={searchQuery}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       <button className='btn-search' onClick={() => handleSearch(searchQuery)}>
//         <img src={Searchmap}/>
//       </button>
//       <div>
//         {/* Mostrar los resultados de la búsqueda */}
//         <ul>
//           {searchResults.map((result, index) => (
//             <li
//               key={index}
//               onClick={() => handleResultClick(result)}
//               style={{ cursor: 'pointer' }}
//             >
//               {result.place_name}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default SearchBar;



import React, { useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './css/SearchBar.css';
import Searchmap from '../../assets/search.svg';
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
        <img src={Searchmap} alt="Search" />
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






// import React, { useState } from 'react';
// import mapboxgl from 'mapbox-gl';
// import './SearchBar.css';
// import Searchmap from '../../assets/search.svg'


// function SearchBar({ map, setMarker }) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const continentes = ["África", "América", "Asia", "Europa", "Oceanía"];
//   const [selectedContinente, setSelectedContinente] = useState(null);
//   const [currentSectionText, setCurrentSectionText] = useState('');

//    const coloresContinentes = {
//     África: 'yellow',
//     América: 'green',
//     Asia: 'purple',
//     Europa: 'orange',
//     Oceanía: '#2F93A9',
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);

//     if (map && query) {
//       fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxgl.accessToken}`)
//         .then(response => response.json())
//         .then(data => {
//           const features = data.features;

//           const filteredResults = features.filter(feature =>
//             feature.place_type.includes('country') || feature.place_type.includes('country')
//           );

//           setSearchResults(filteredResults);
//         });
//     } else {
//       setSearchResults([]);
//     }
//   };


//   const handleResultClick = (result) => {
//     const [lng, lat] = result.center;
    
//     map.flyTo({ center: [lng, lat] });

//     if (setMarker) {
//       setMarker(marker => {
//         if (marker) {
//           marker.remove();
//         }
        
//         const newMarker = new mapboxgl.Marker()
//           .setLngLat([lng, lat])
//           .addTo(map);
        
//         return newMarker;
//       });
//     }
//   };

//   const handleContinenteClick = (continente) => {
//     setSelectedContinente(continente);

//     setCurrentSectionText(`Esta es la sección de ${continente}`);


//     // Aquí puedes implementar la lógica para centrar el mapa en el continente seleccionado
//     // Puedes usar información geoespacial o coordenadas para definir la vista del mapa.
//     if (map) {
//       switch (continente) {
//         case 'África':
//           map.flyTo({
//             center: [8.6753, 9.0820],
//             zoom: 2,
//           });
//           break;
//         case 'América':
//           map.flyTo({
//             center: [-95.7129, 37.0902],
//             zoom: 1,
//           });
//           break;
//         case 'Asia':
//           map.flyTo({
//             center: [95.7129, 37.0902],
//             zoom: 3,
//           });
//           break;
//         case 'Europa':
//           map.flyTo({
//             center: [14.4378, 50.0755],
//             zoom: 3,
//           });
//           break;
//         case 'Oceanía':
//           map.flyTo({
//             center: [133.7751, -25.2744],
//             zoom: 3,
//           });
//           break;
//         default:
//           break;
//       }
//     }
//   };
//   return (
//     <div className='container-search-map'>
//       <input className='search-map'
//         type="text"
//         placeholder="Buscar país, comida, ect..."
//         value={searchQuery}
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//       <button className='btn-search' onClick={() => handleSearch(searchQuery)}>
//         <img src={Searchmap} alt="Buscar" />
//       </button>
//       <div className='search-list'>
//         {/* Mostrar los resultados de la búsqueda */}
//         <ul>
//           {searchResults.map((result, index) => (
//             <li
//               key={index}
//               onClick={() => handleResultClick(result)}
//               style={{ cursor: 'pointer' }}
//             >
//               {result.place_name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="continent-list">
//         {continentes.map((continente, index) => (
//           <span
//             key={index}
//             onClick={() => handleContinenteClick(continente)}
//             style={{
//               backgroundColor: selectedContinente === continente ? coloresContinentes[continente] : 'transparent',
//               cursor: 'pointer'
//             }}
//           >
//             {continente}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SearchBar;
