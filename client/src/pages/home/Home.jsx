import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import MapboxMap from '../../components/map/MapboxMap';
import RecipePost from '../../components/recipepost/RecipePost';


const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {

    axios.get('/api/recipes')
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las recetas:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <MapboxMap />
      <div className="recipe-posts">
        {recipes.map((recipe) => (
          <RecipePost key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <Nav />
    </div>
  );
};

export default Home;
