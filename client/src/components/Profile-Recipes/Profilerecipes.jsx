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
                // console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);


    return (
        <div>
            <div className="d-flex f-wrap">
                {recipes.map((recipe, index) => (

                    <div className="col-md-6 mx-2 width-11" key={index}>
                        <div className="card mb-4">
                            <div className="row no-gutters">
                                <Link to={`/recipe/${recipe.id}`} className="link-style-none">
                                    <div className="col-md-4">
                                        <img src={recipe.image_url} alt={recipe.title} className="card-img" style={{ width: '11rem', height: '11rem' }} />
                                    </div>
                                </Link>
                                <div className="col-md-8">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">{recipe.title}</h5>
                                        <Menu currentPage={currentPage} recipeId={recipe.id} recipes={recipes} setRecipes={setRecipes} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default Profilerecipes;

