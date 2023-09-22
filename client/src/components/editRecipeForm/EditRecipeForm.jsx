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
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [preparation, setPreparation] = useState('')
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
                author,
                description,
                time,
                difficulty,
                ingredients,
                preparation,
                image,
            };

            const response = await updateRecipe(id, data);
            if (response.errors) {
                console.log('Errors:', response.errors);
            } else {
                // swal("Success", response.message, "success");
                // navigate(`/recipe/${response.id}`);
                navigate('/');
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
                setAuthor(data.recipe.author)
                setDescription(data.recipe.description)
                setTime(data.recipe.time)
                setDifficulty(data.recipe.difficulty)
                setIngredients(data.recipe.ingredients)
                setPreparation(data.recipe.preparation)
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
            <h2 className="p-5 fw-bold text-center headline-form-color headline-form-size">Editar receta</h2>
            <form className="d-flex flex-column justify-content-around reg-form" onSubmit={handleSubmit}>

                <div className="d-flex flex-column">
                    <label htmlFor="name" className="fw-bold fs-5 label-text text">Título</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.title && <div className="alerts">
                        <p>{errors.title}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="author" className="fw-bold fs-5 label-text text">Autor</label>
                    <input
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        type="text"
                        name="author"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.author && <div className="alerts">
                        <p>{errors.author}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="description" className="fw-bold fs-5 label-text text">Descripción</label>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        name="description"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.description && <div className="alerts">
                        <p>{errors.description}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="time" className="fw-bold fs-5 label-text text">Tiempo de preparación</label>
                    <input
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        type="text"
                        name="time"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.time && <div className="alerts">
                        <p>{errors.time}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="difficulty" className="fw-bold fs-5 label-text text">Dificultad</label>
                    <input
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        type="text"
                        name="difficulty"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.difficulty && <div className="alerts">
                        <p>{errors.difficulty}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="ingredients" className="fw-bold fs-5 label-text text">Ingredientes</label>
                    <input
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        type="text"
                        name="ingredients"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.ingredients && <div className="alerts">
                        <p>{errors.ingredients}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="preparation" className="fw-bold fs-5 label-text text">Preparación</label>
                    <input
                        value={preparation}
                        onChange={(e) => setPreparation(e.target.value)}
                        type="text"
                        name="preparation"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.preparation && <div className="alerts">
                        <p>{errors.preparation}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="image" className="fw-bold fs-5 label-text text">Imagen</label>
                    <input
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        type="text"
                        name="image"
                        className="input-none-style border-b"
                    />
                </div>

                {
                    errors.image && <div className="alerts">
                        <p>{errors.image}</p>
                    </div>
                }

                <div className="d-flex justify-content-between">
                    <Button backgroundColorClass="bttn-primary" text="Añadir" widthClass="simpleW" />
                    <Link to={`/`}><Button backgroundColorClass="bttn-secondary" text="Cancelar" /></Link>
                </div>

            </form>
        </div>
    )
}

export default EditRecipeForm