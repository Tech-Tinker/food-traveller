import React from 'react';

function MapToggle({ isFlatMode, toggleMode }) {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
      {/* Botón o interruptor para cambiar entre modos */}
      <label>
        Modo Plano
        <input
          type="checkbox"
          checked={isFlatMode}
          onChange={toggleMode}
        />
      </label>
    </div>
  );
}

export default MapToggle;
