import React from 'react';
import './css/MapToggle.css'
import Info from "../../assets/mapa-plano.webp"

function MapToggle({ isFlatMode, toggleMode }) {
  return (
    <div className='container-toggle' style={{ position: 'absolute', right: '10px', zIndex: 1000, display: 'flex' }}>
      {/* Boton que permite cambiar de plano*/}
      {/* <label className='map-toggle'>
        Modo Plano
        <input 
          type="checkbox"
          checked={isFlatMode}
          onChange={toggleMode}
        />
      </label> */}
       <p>Modo plano</p>
       <button className='map-toggle' onClick={toggleMode}>
          <img className='mode-map' src={Info} alt="Botón de cambio de modo" />
       </button>
    </div>
  );
}

export default MapToggle;
