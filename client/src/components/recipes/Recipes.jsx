import React from 'react';
import './Recipes.css';

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
    </div>
  );
};

export default Recipes;


