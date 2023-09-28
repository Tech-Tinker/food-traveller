import React from 'react';
import { Link } from 'react-router-dom';
import './RecipePost.css'

const RecipePost = ({ recipe }) => {
  const { title, category, country, image } = recipe;

  return (
    <div className="recipe-post">
      <Link to={`/recipe/${recipe.id}`} className="link-style-none">
        <div className='image-container'>
          <img src={image} alt={title} />
        </div>
        <div className='date-container'>
          <h3>{title}</h3>
          <p className='category-container'>{category}</p>
          <p>Inspirado en la gastronomía de {country}</p>
        </div>
      </Link>
    </div>
  );
};

export default RecipePost;
