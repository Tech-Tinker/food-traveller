import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import MapToggle from './MapToogle';
import './css/MapboxMap.css'

function MapboxMap() {
  const [map, setMap] = useState(null);
  const [isFlatMode, setIsFlatMode] = useState(false);
  const [marker, setMarker] = useState(null);
  const toggleMode = () => {
    setIsFlatMode(!isFlatMode);
  };

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuZW5mIiwiYSI6ImNsbXN2MmJ1ZzAzaTEyaXM0aGhvcWVmZDEifQ.nBufcYLKUJUZb0yobUyJWg';
  
    // Verificar si el navegador admite geolocalización
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
  
        const mapInstance = new mapboxgl.Map({
          container: 'map',
          style: isFlatMode
            ? 'mapbox://styles/mapbox/streets-v11'
            : 'mapbox://styles/genenf/clnhpcirz03x501nzcl5lhu41',
          center: [longitude, latitude], // Utiliza las coordenadas del usuario
          zoom: 3, // Ajusta el nivel de zoom según tus necesidades
        });
  
        setMap(mapInstance);
      }, (error) => {
        console.error('Error de geolocalización:', error);
        // Si hay un error al obtener la ubicación, puedes establecer un centro de mapa predeterminado
        const mapInstance = new mapboxgl.Map({
          container: 'map',
          style: isFlatMode
            ? 'mapbox://styles/mapbox/streets-v11'
            : 'mapbox://styles/genenf/clnhpcirz03x501nzcl5lhu41',
          center: [-74.006, 40.7128], // Centro predeterminado en caso de error
          zoom: 1,
        });
  
        setMap(mapInstance);
      });
    } else {
      console.warn('La geolocalización no es compatible en este navegador');
      // Si la geolocalización no es compatible, establece un centro de mapa predeterminado
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: isFlatMode
          ? 'mapbox://styles/mapbox/streets-v11'
          : 'mapbox://styles/genenf/clmtheczn02el01nz01kp67bk',
        center: [-74.006, 40.7128], // Centro predeterminado en caso de que la geolocalización no sea compatible
        zoom:1,
      });
  
      setMap(mapInstance);
    }

  }, [isFlatMode]);
  

  return (
    <div style={{ position: 'relative' }}>
      <h1 className='banner-map'>Where Food Meets Culture</h1>
      <MapToggle isFlatMode={isFlatMode} toggleMode={toggleMode} />
      <MapDisplay map={map} marker={marker} />
      <SearchBar map={map} setMarker={setMarker} marker={marker} /> 

    </div>
  );
}

export default MapboxMap;
