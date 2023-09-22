import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import MapToggle from './MapToogle';

function MapboxMap() {
  const [map, setMap] = useState(null);
  const [isFlatMode, setIsFlatMode] = useState(false); // Estado para el modo plano
  const [marker, setMarker] = useState(null); // Estado para el marcador

  useEffect(() => {
    // Configura tu token de Mapbox (reemplaza 'tu-token' con tu propio token)
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuZW5mIiwiYSI6ImNsbXN2MmJ1ZzAzaTEyaXM0aGhvcWVmZDEifQ.nBufcYLKUJUZb0yobUyJWg';

    // Crea una instancia del mapa en un elemento HTML
    const mapInstance = new mapboxgl.Map({
      container: 'map', // ID del elemento HTML donde se mostrará el mapa
      style: isFlatMode
        ? 'mapbox://styles/mapbox/streets-v11' // Estilo plano
        : 'mapbox://styles/genenf/clmtheczn02el01nz01kp67bk', // Estilo 3D
      center: [-74.006, 40.7128], // Coordenadas del centro del mapa (longitud, latitud)
      zoom: 6, // Nivel de zoom inicial
    });

    setMap(mapInstance);

    // Limpia el mapa cuando el componente se desmonta
    return () => mapInstance.remove();
  }, [isFlatMode]);

  // Función para manejar el cambio entre modos plano y 3D
  const toggleMode = () => {
    setIsFlatMode(!isFlatMode);
  };

  return (
    <div style={{ position: 'relative' }}>
      <SearchBar map={map} setMarker={setMarker} marker={marker} /> {/* Pasa marker como prop */}
      <MapDisplay map={map} marker={marker} />
      <MapToggle isFlatMode={isFlatMode} toggleMode={toggleMode} />
    </div>
  );
}

export default MapboxMap;
