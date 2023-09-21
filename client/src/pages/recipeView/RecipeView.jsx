import React from 'react';
import Recipe from '../../components/recipe/Recipe';
import './RecipeView.css';

const RecipeView = () => {
  const recipeData = {
    title: 'Tarta de Manzana',
    ingredients: ['Manzanas', 'Azúcar', 'Harina', 'Mantequilla'],
    instructions: [
      'Pela y corta las manzanas en rodajas.',
      'Mezcla azúcar, harina y mantequilla para hacer la masa.',
      'Coloca las manzanas sobre la masa en un molde para hornear.',
      'Hornea durante 30 minutos a 180 grados Celsius.',
    ],
  };

  return (
    <div className="recipe-view">
      <h1>Receta de {recipeData.title}</h1>
      <Recipe
        title={recipeData.title}
        ingredients={recipeData.ingredients}
        instructions={recipeData.instructions}
      />
    </div>
  );
};

export default RecipeView;
