import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importa Axios
import './Home.css';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import MapboxMap from '../../components/map/MapboxMap';
import RecipePost from '../../components/recipepost/RecipePost';


const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Realiza la solicitud a la API usando Axios cuando el componente se monta
    axios.get('/api/recipes') // Reemplaza 'URL_DE_TU_API_RECETAS' con la URL real de tu API
      .then((response) => {
        // Actualiza el estado 'recipes' con los datos recibidos de la API
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener las recetas:', error);
      });
  }, []); // La dependencia vacía [] garantiza que esta solicitud se realice solo una vez, al montar el componente.

  return (
    <div>
      <Header />
      <MapboxMap />
      <Nav />
      <div className="recipe-posts">
        {recipes.map((recipe) => (
          <RecipePost key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Home;
