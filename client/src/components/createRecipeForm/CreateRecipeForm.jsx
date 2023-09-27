import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Button from '../button/Button';
import '../createRecipeForm/CreateRecipeForm.css';
import { storeRecipe } from '../../services/ApiServices';

const CreateRecipeForm = () => {

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

            const response = await storeRecipe(data);

            if (response.errors) {
                console.log('Errors:', response.errors);
            } else {
                swal("Success", response.message, "success");
                navigate(`/recipe/${response.id}`);
                // navigate('/');
            }
        } catch (error) {
            console.error('Error creating recipe:', error);
            // const errors = error.response.data.errors
            // setErrors({ image: errors.image && errors.image[0], title: errors.title && errors.title[0], location: errors.location && errors.location[0], description: errors.description && errors.description[0], });
        }
    };

    return (
        <div className="d-flex flex-column justify-content-around align-items-center display-h">
            <h2 className="p-5 fw-bold text-center headline-form-color headline-form-size">Nueva receta</h2>
            <form className="d-flex flex-column justify-content-around reg-form" onSubmit={handleSubmit}>

                <div className="d-flex flex-column">
                    <label htmlFor="name" className="fw-bold label-text text">Título</label>
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
                    <label htmlFor="description" className="fw-bold label-text text">Descripción general</label>
                    <input
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

                <div className="d-flex flex-column">
                    <label htmlFor="difficulty" className="fw-bold label-text text">Dificultad</label>
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
                    <label htmlFor="ingredients" className="fw-bold label-text text">Ingredientes</label>
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
                    <label htmlFor="image" className="fw-bold label-text text">Imagen</label>
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
                    <Link to={`/`}><Button backgroundColorClass="bttn-primary" text="Cancelar" widthClass="simpleW" /></Link>
                    <Button backgroundColorClass="bttn-secondary" text="Añadir" />
                </div>

            </form>
        </div>
    )
}

export default CreateRecipeForm;