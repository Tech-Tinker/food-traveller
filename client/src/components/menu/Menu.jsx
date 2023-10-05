import React, { useState } from "react";
import '../menu-burguer/MenuBurguer.css';
import Delete from '../../assets/Delete.svg';
import ellipsis from '../../assets/ellipsis.svg';
import Edit from '../../assets/Edit.svg';
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../services/ApiServices";
import Swal from 'sweetalert';

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
                        
                            <hr class="linea-horizontal link-style-none"></hr>

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
