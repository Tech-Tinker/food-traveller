import React, { useState } from 'react';
import './css/ViewOptions.css'

const ViewOptions = ({ viewOption, onViewOptionChange }) => {
  const [activeButton, setActiveButton] = useState({
    option: viewOption,
    color: 'transparent', 
  });

  const handleOptionClick = (option, color) => {
    setActiveButton({ ...activeButton, color: 'transparent' });

    setActiveButton({ option, color });

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
