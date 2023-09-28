import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from '../menu/Menu';
import { useLocation } from 'react-router-dom';



const Profilerecipes = () => {
    const location = useLocation();
    const currentPage = location.pathname;
    const userId = Number(localStorage.getItem('auth_user_id'));
    // console.log(userId);
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/recipes?user_id=${userId}`)

            .then((response) => {
                setRecipes(response.data);
                // console.log(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);


    return (
        <div>
            <div style={{ display: 'flex' }}>
                {recipes.map((recipe, index) => (
                    <div className="col-md-6 mx-2 width-11" key={index}>
                        <div className="card mb-4">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={recipe.image} alt={recipe.title} className="card-img" style={{ width: '11rem', height: '11rem' }} />
                                </div>
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

