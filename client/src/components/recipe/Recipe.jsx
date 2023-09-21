import React from 'react';
import './Recipe.css';

const Recipe = ({ title, ingredients, instructions }) => {


  return (
    <div className='recipe'>
      <h1>{title}</h1>
      <h2>Ingredientes:</h2>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instrucciones:</h2>
      <ol>
        {instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default Recipe;