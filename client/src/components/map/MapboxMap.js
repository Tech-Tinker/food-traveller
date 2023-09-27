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

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuZW5mIiwiYSI6ImNsbXN2MmJ1ZzAzaTEyaXM0aGhvcWVmZDEifQ.nBufcYLKUJUZb0yobUyJWg';

    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: isFlatMode
        ? 'mapbox://styles/mapbox/streets-v11'
        : 'mapbox://styles/genenf/clmtheczn02el01nz01kp67bk',
      center: [-74.006, 40.7128],
      zoom: 1,
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, [isFlatMode]);

  const toggleMode = () => {
    setIsFlatMode(!isFlatMode);
  };

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
