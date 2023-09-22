import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Recipe from '../../components/recipe/Recipe';
import './RecipeView.css';

const RecipeView = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    Axios.get('http://127.0.0.1:8000/api/recipes/')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la receta:', error);
      });
  }, []);

  return (
    <div className="recipe-view">
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h1>Receta de {recipe.name}</h1>
          <Recipe
            title={recipe.name}
            ingredients={recipe.ingredients.split(', ')}
            instructions={recipe.preparation.split('. ')}
          />
          <div className="recipe-details">
            <h2>Detalles de la receta</h2>
            <p>ID: {recipe.id}</p>
            <p>Nombre: {recipe.name}</p>
            <p>Imagen: {recipe.image}</p>
            <p>Descripción: {recipe.description}</p>
            <p>Autor: {recipe.author}</p>
            <p>Tiempo: {recipe.time}</p>
            <p>Dificultad: {recipe.difficulty}</p>
            <p>Ingredientes: {recipe.ingredients}</p>
            <p>Preparación: {recipe.preparation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeView;
