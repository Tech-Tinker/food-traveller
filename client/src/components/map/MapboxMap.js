import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import SearchBar from './SearchBar';
import MapDisplay from './MapDisplay';
import MapToggle from './MapToogle';
import './css/MapboxMap.css'

function MapboxMap(props) {
  const [map, setMap] = useState(null);
  const [isFlatMode, setIsFlatMode] = useState(false);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VuZW5mIiwiYSI6ImNsbXN2MmJ1ZzAzaTEyaXM0aGhvcWVmZDEifQ.nBufcYLKUJUZb0yobUyJWg';

    const mapInstance = new mapboxgl.Map({
      container: 'map',
      style: isFlatMode
        ? 'mapbox://styles/mapbox/streets-v11'
        : 'mapbox://styles/leabujhamer/clnhocnwm024s01qnf3ysdk78',
      center: [2.1734, 41.3851],
      zoom: 0.95,
      locale: 'es-ES'
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
      <div id="searchBar">
        <SearchBar searchEvent={props.searchEvent} map={map} setMarker={setMarker} marker={marker} scrollToSearchBar={props.scrollToSearchBar} />
      </div>
    </div>
  );
}

export default MapboxMap;
