import React, { useState } from "react";
import './Menu.css';
import Delete from '../../assets/Delete.svg';
import ellipsis from '../../assets/ellipsis.svg';
import Edit from '../../assets/Edit.svg';
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../services/ApiServices";

const Menu = ({ currentPage, recipeId, recipes, setRecipes }) => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleDelete = async (e, id) => {
        try {
            e.stopPropagation();
            await deleteRecipe(id);
            const newRecipeList = recipes.filter(el => el.id !== id);
            setRecipes(newRecipeList);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div className="menu-hamburguesa">
            <div className="menu-icon" onClick={toggleMenu}>
                <img src={ellipsis} alt="" />
            </div>
            {menuVisible && (
                <ul className="menu-list">
                    {currentPage === '/profile' && (
                        <>
                            <li className="list-style-none"><Link to={`/edit-recipe/${recipeId}`} className="link-style-none">
                                <img src={Edit} alt="" />
                                <span>Editar Receta</span></Link>
                            </li>
                            <li className="list-style-none">
                                <button onClick={(e) => handleDelete(e, recipeId)} className='delete-button'><img src={Delete} alt="" /></button>
                                <span>Eliminar receta</span>
                            </li>
                        </>
                    )}

                </ul>
            )}
        </div>
    );
};

export default Menu;
