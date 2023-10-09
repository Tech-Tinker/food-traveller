import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../menu/Menu';
import { Link, useLocation } from 'react-router-dom';
import './Profilerecipes.css';

const Profilerecipes = () => {
    const location = useLocation();
    const currentPage = location.pathname;
    const userId = Number(localStorage.getItem('auth_user_id'));
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/recipes?user_id=${userId}`)
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);

    return (
        <div className="recipe-grid">
            {recipes.map((recipe, index) => (
                <div className="recipe-card pad-2" key={index}>
                    <Link to={`/recipe/${recipe.id}`} className="link-style-none">
                        <div className="recipe-image image-container">
                            <img src={recipe.image_url} alt={recipe.title} />
                        </div>
                    </Link>
                    <div className="recipe-details">
                        <div className="recipe-title-menu">
                            <h5 className="recipe-title">{recipe.title}</h5>
                            <Menu currentPage={currentPage} recipeId={recipe.id} recipes={recipes} setRecipes={setRecipes} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profilerecipes;



