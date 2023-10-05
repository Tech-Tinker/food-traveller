import React from 'react';
import './Recipes.css';
import Rating from '../rating/Rating'; 

const Recipes = ({ title, ingredients, instructions }) => {
  return (
    <div className='recipe'>
      <h1>{title}</h1>
      <h2>Ingredientes:</h2>
      <ul>
        {ingredients && ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instrucciones:</h2>
      <ol>
        {instructions && instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      {/* Muestra las estrellas del componente Rating */}
      <Rating />

      {/* Recuadro de comentario y botón */}
      <div className="comment-box">
        <textarea placeholder="¿Qué opinas de esta receta?"></textarea>
        <button>Enviar</button>
      </div>
    </div>
  );
};

export default Recipes;


