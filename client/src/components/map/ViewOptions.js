import React, { useState } from 'react';
import './css/ViewOptions.css'

const ViewOptions = ({ viewOption, onViewOptionChange }) => {
  // Estado para rastrear el botón activo y su color
  const [activeButton, setActiveButton] = useState({
    option: viewOption,
    color: 'transparent', // Inicialmente transparente
  });

  // Función para manejar el clic en un botón
  const handleOptionClick = (option, color) => {
    // Desactivar el botón anterior
    setActiveButton({ ...activeButton, color: 'transparent' });

    // Activar el botón actual con el color especificado
    setActiveButton({ option, color });

    // Llama a la función de cambio de vista
    onViewOptionChange(option);
  };

  return (
    <div className="view-options">
      <button
        className="view-option-btn"
        style={{ backgroundColor: activeButton.option === 'africa' ? activeButton.color : '' }}
        onClick={() => handleOptionClick('africa', 'yellow')}
      >
        África
      </button>
      <button
        className="view-option-btn"
        style={{ backgroundColor: activeButton.option === 'america' ? activeButton.color : '' }}
        onClick={() => handleOptionClick('america', 'green')}
      >
        América
      </button>
      <button
        className="view-option-btn"
        style={{ backgroundColor: activeButton.option === 'asia' ? activeButton.color : '' }}
        onClick={() => handleOptionClick('asia', 'purple')}
      >
        Asia
      </button>
      <button
        className="view-option-btn"
        style={{ backgroundColor: activeButton.option === 'europa' ? activeButton.color : '' }}
        onClick={() => handleOptionClick('europa', 'orange')}
      >
        Europa
      </button>
      <button
        className="view-option-btn"
        style={{ backgroundColor: activeButton.option === 'oceania' ? activeButton.color : '' }}
        onClick={() => handleOptionClick('oceania', '#2F93A9')}
      >
        Oceanía
      </button>
    </div>
  );
};

export default ViewOptions;
