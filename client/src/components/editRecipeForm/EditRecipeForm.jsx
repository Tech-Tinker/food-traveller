import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
// eslint-disable-next-line
import swal from 'sweetalert';
import Button from '../button/Button';
import '../createRecipeForm/CreateRecipeForm.css';
import { getRecipeById, updateRecipe } from '../../services/ApiServices';

const EditRecipeForm = () => {

    const userId = Number(localStorage.getItem('auth_user_id'));

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState('')
    const [category, setCategory] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [preparation, setPreparation] = useState('')
    const [country, setCountry] = useState('')
    const [image, setImage] = useState('')

    // eslint-disable-next-line
    const [errors, setErrors] = useState({
        image: null,
        title: null,
        location: null,
        description: null
    })
    const navigate = useNavigate()
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                title,
                description,
                time,
                category,
                difficulty,
                ingredients,
                preparation,
                country,
                image,
            };

            const response = await updateRecipe(id, data);
            console.log(response);
            if (response.errors) {
                console.log('Errors:', response.errors);
            } else {
                swal("Success", response.message, "success");
                navigate(`/recipe/${response.recipe.id}`);
                // navigate('/');
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            // const errors = error.response.data.errors
            // setErrors({ image: errors.image && errors.image[0], title: errors.title && errors.title[0], location: errors.location && errors.location[0], description: errors.description && errors.description[0], });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecipeById(id);
                // console.log(data.recipe);
                console.log(data.recipe.user_id, userId, data.recipe.user_id !== userId)
                if (data.recipe.user_id !== userId) {
                    navigate('/')
                    return
                }
                setTitle(data.recipe.title)
                setDescription(data.recipe.description)
                setTime(data.recipe.time)
                setCategory(data.recipe.category)
                setDifficulty(data.recipe.difficulty)
                setIngredients(data.recipe.ingredients)
                setPreparation(data.recipe.preparation)
                setCountry(data.recipe.country)
                setImage(data.recipe.image)
            } catch (error) {
                console.error('Error fetching recipe by ID:', error);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="d-flex flex-column justify-content-around align-items-center display-h">
            <h2 className="p-3 m-0 fw-bold text-center headline-form-color headline-form-size">Editar receta</h2>
            <form className="d-flex flex-column justify-content-around reg-form" onSubmit={handleSubmit}>

                <div className="d-flex flex-column">
                    <label htmlFor="title" className="fw-bold label-text text">Título</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        className="input-style-1 input-height-1 b-r"
                    />
                </div>

                {
                    errors.title && <div className="alerts">
                        <p>{errors.title}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="description" className="fw-bold label-text text">Descripción</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        name="description"
                        className="input-style-1 input-height-2 b-r"
                    />
                </div>

                {
                    errors.description && <div className="alerts">
                        <p>{errors.description}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="time" className="fw-bold label-text text">Tiempo de preparación</label>
                    <input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="text"
                        name="time"
                        className="input-style-1 input-height-1 b-r"
                    />
                </div>

                {
                    errors.time && <div className="alerts">
                        <p>{errors.time}</p>
                    </div>
                }

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="category" className="fw-bold label-text text">Categoría</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        type="text"
                        name="category"
                        className="select"
                    >
                        <option value="Selecciona">Selecciona</option>
                        <option value="Entrante">Entrante</option>
                        <option value="Primer Plato">Primer Plato</option>
                        <option value="Segundo Plato">Segundo Plato</option>
                        <option value="Postre">Postre</option>
                    </select>
                </div>

                {
                    errors.category && <div className="alerts">
                        <p>{errors.category}</p>
                    </div>
                }

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="difficulty" className="fw-bold label-text text">Dificultad</label>
                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        type="text"
                        name="difficulty"
                        className="select"
                    >
                        <option value="Selecciona">Selecciona</option>
                        <option value="Fácil">Fácil</option>
                        <option value="Intermedia">Intermedia</option>
                        <option value="Difícil">Difícil</option>
                    </select>
                </div>

                {
                    errors.difficulty && <div className="alerts">
                        <p>{errors.difficulty}</p>
                    </div>
                }

                <div className="d-flex justify-content-between align-items-center">
                    <label htmlFor="ingredients" className="fw-bold label-text text">Ingredientes</label>
                    <select
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        type="text"
                        name="ingredients"
                        className="select"
                    >
                        <option value="Selecciona">Selecciona</option>
                        <option value="Huevo">Huevo</option>
                        <option value="Harina">Harina</option>
                        <option value="Arroz">Arroz</option>
                        <option value="Legumbres">Legumbres</option>
                        <option value="Ajo">Ajo</option>
                        <option value="Frutos secos">Frutos secos</option>
                        <option value="Miel">Miel</option>
                        <option value="Aceitunas">Aceitunas</option>
                        <option value="Patata">Patata</option>
                        <option value="Sal">Sal</option>
                        <option value="Pimienta">Pimienta</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {
                    errors.ingredients && <div className="alerts">
                        <p>{errors.ingredients}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="preparation" className="fw-bold label-text text">Preparación</label>
                    <input
                        value={preparation}
                        onChange={(e) => setPreparation(e.target.value)}
                        type="text"
                        name="preparation"
                        className="input-style-1 input-height-3 b-r"
                    />
                </div>

                {
                    errors.preparation && <div className="alerts">
                        <p>{errors.preparation}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="country" className="fw-bold label-text text">País</label>
                    <input
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        type="text"
                        name="image"
                        className="input-style-1 input-height-1 b-r"
                    />
                </div>

                {
                    errors.country && <div className="alerts">
                        <p>{errors.country}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="image" className="fw-bold label-text text">Imagen</label>
                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        name="image"
                        className="input-style-1 input-height-1 b-r"
                    />
                </div>

                {
                    errors.image && <div className="alerts">
                        <p>{errors.image}</p>
                    </div>
                }

                <div className="d-flex justify-content-between">
                    <Link to={`/`}><Button backgroundColorClass="bttn-primary" text="Cancelar" widthClass="simpleW" /></Link>
                    <Button backgroundColorClass="bttn-secondary" text="Añadir" />
                </div>

            </form>
        </div>
    )
}

export default EditRecipeForm
