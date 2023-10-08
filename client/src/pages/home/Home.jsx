import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import MapboxMap from '../../components/map/MapboxMap';
import RecipePost from '../../components/recipepost/RecipePost';


const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {

    axios.get('/api/recipes')
      .then((response) => {
        setRecipes(response.data);
        setAllRecipes(response.data)
      })
      .catch((error) => {
        console.error('Error al obtener las recetas:', error);
      });
  }, []);

  const searchEvent = (recipes) => setRecipes(recipes)

  const homeEvent = () => setRecipes(allRecipes);

  const scrollToSearchBar = () => {
    const searchBarElement = document.getElementById('searchBar');
    if (searchBarElement) {
      searchBarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Header homeEvent={homeEvent} />
      <MapboxMap searchEvent={searchEvent} scrollToSearchBar={scrollToSearchBar} />
      <div className="recipe-posts">
        {recipes.map((recipe) => (
          <RecipePost key={recipe.id} recipe={recipe} />
        ))}
      </div>
      <Nav homeEvent={homeEvent} />
    </div>
  );
};

export default Home;
