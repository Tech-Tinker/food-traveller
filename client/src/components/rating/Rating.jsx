import React, { useState } from "react";
import "./Rating.css";
import { saveRatingService } from '../../services/ApiServices';

function Rating() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");
  const [serverResponse, setServerResponse] = useState(null);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await saveRatingService(currentValue, comment);
      setServerResponse(response.message);
    } catch (error) {
      console.error("Error:", error);
    }
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
        value={comment}
        onChange={handleCommentChange}
      />

      <button className="button" onClick={handleSubmit}>
        Submit
      </button>

      {serverResponse && <p>{serverResponse}</p>}
    </div>
  );
}

export default Rating;
