import React, { useState } from "react";
import "./Rating.css";
import axios from "axios";

function Rating() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [comment, setComment] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = document.head.querySelector('meta[name="csrf-token"]').content;

      await axios.post("/api/recipe-reviews", {
        rating: currentValue,
        comment: comment,
      }, {
        headers: {
          'X-CSRF-TOKEN': token
        }
      });

      setCurrentValue(0);
      setComment("");
      setHoverValue(undefined);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    }
  };

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

  const maxStars = 5;

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Rating;







// import React, { useState } from "react";
// import "./Rating.css"; 

// function Rating() {
//   const [currentValue, setCurrentValue] = useState(0);
//   const [hoverValue, setHoverValue] = useState(undefined);
//   const [comment, setComment] = useState(""); 

//   const handleClick = (value) => {
//     setCurrentValue(value);
//   };

//   const handleMouseOver = (newHoverValue) => {
//     setHoverValue(newHoverValue);
//   };

//   const handleMouseLeave = () => {
//     setHoverValue(undefined);
//   };

//   const handleCommentChange = (event) => {
//     setComment(event.target.value);
//   };

//   const maxStars = 5;

//   return (
//     <div className="container">
//       <div className="stars">
//         {Array.from({ length: maxStars }).map((_, index) => (
//           <span
//             key={index}
//             onClick={() => handleClick(index + 1)}
//             onMouseOver={() => handleMouseOver(index + 1)}
//             onMouseLeave={handleMouseLeave}
//             className={`star ${
//               index < (hoverValue || currentValue) ? "orange" : "blue"
//             }`}
//           >
//             ★ 
//           </span>
//         ))}
//       </div>
//       {/* Casilla de comentario */}
//       <textarea
//         placeholder="¿Te ha gustado la receta?"
//         className="textarea"
//         value={comment}
//         onChange={handleCommentChange}
//       />
//       {/* Botón de enviar comentario */}
//       <button className="button">Submit</button>
//     </div>
//   );
// }

// export default Rating;

