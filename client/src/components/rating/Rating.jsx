import React, { useState } from "react";
import "./Rating.css";

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

  const handleSubmit = () => {
  
    fetch("/api/rating", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: currentValue, comment: comment }),
    })
      .then((response) => response.json())
      .then((data) => {
        setServerResponse(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
