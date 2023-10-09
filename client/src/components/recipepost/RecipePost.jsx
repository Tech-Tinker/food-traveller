import React from 'react';
import { Link } from 'react-router-dom';
import './RecipePost.css'

const RecipePost = ({ recipe }) => {
  const { title, country, image_url } = recipe;

  return (
    <div className="recipe-post recipe-marker">
      <Link to={`/recipe/${recipe.id}`} className="link-style-none">
        <div className='image-container'>
          <img src={image_url} alt={title} />
        </div>
        <div className='date-container'>
          <h3>{title}</h3>
          <p>Inspirado en la gastronomía de {country}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipePost;
