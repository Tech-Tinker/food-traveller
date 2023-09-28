import React, { useEffect, useState } from 'react';
import axios from 'axios';
import recetas from '../../assets/Rectangle 439.png';
import icono from '../../assets/ellipsis.svg';



const Profilerecipes = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/recipes')
            .then((response) => {
                setRecipes(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    
    return (
        <div>
            <div style={{ display: 'flex' }}>
                {recipes.map((recipe, index) => (
                    <div className="col-md-6 width:8rem mx-2" key={index}>
                        <div className="card mb-4">
                            <div className="row no-gutters">
                                <div className="col-md-4">
                                    <img src={recetas} alt={recipe.title} className="card-img" style={{ width: '100%', height: '100%' }} />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{recipe.title}
                                        <img className="mx-8" src={icono} alt="imagenes" />
                                        </h5>
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

