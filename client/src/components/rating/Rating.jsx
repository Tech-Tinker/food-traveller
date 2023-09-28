import React, { useState } from "react";
import "./Rating.css"; 

function Rating() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const maxStars = 5;

  return (
    <div className="container">
      <div className="stars">
        {Array.from({ length: maxStars }).map((_, index) => (
          <span
            key={index}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            className={`star ${
              index < (hoverValue || currentValue) ? "orange" : "blue"
            }`}
          >
            ★ 
          </span>
        ))}
      </div>
      <textarea
        placeholder="¿Te ha gustado la receta?"
        className="textarea"
      />

      <button className="button">Submit</button>
    </div>
  );
}

export default Rating;
