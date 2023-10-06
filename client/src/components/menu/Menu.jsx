import React, { useState } from "react";
import './Menu.css';
import Delete from '../../assets/Delete.svg';
import ellipsis from '../../assets/ellipsis.svg';
import Edit from '../../assets/Edit.svg';
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../services/ApiServices";
import Swal from 'sweetalert';
import Cruz from '../../assets/Cruz.svg';


const Menu = ({ currentPage, recipeId, recipes, setRecipes }) => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleDelete = async (e, id) => {
        try {
            e.stopPropagation();

            Swal({
                title: "Eliminar receta",
                text: "Estás seguro de que deseas eliminar esta receta?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        deleteRecipe(id);
                        const newRecipeList = recipes.filter(el => el.id !== id);
                        setRecipes(newRecipeList);
                        Swal("Receta eliminada con éxito", {
                            icon: "success",
                        });
                    }
                });
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    return (
        <div className="menu-container">
            {menuVisible && <div className="overlay" onClick={toggleMenu}></div>}
            <div className="menu-hamburguesa">
                <div className="menu-icon" onClick={toggleMenu}>
                    <img src={ellipsis} alt="" />
                </div>
                {menuVisible && (
                    <div>
                        <div className="close" onClick={toggleMenu}>
                            <span><img src={Cruz} alt="" /></span>
                        </div>
                        <ul className="menu-ls">
                            {currentPage === '/profile' && (
                                <>
                                    <li className="list-item"><Link to={`/edit-recipe/${recipeId}`} className="link-style-none">
                                        <img src={Edit} alt="" />
                                        <span className="mx-2">Editar Receta</span></Link>
                                    </li>
                                    <li className="list-item">
                                        <button onClick={(e) => handleDelete(e, recipeId)} className='delete-button'><img src={Delete} alt="" /><span className="mx-2">Eliminar receta</span></button>
                                    </li>
                                </>
                            )}

                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;
