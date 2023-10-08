import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Button from '../button/Button';
import '../createRecipeForm/CreateRecipeForm.css';
import { getRecipeById, updateRecipe } from '../../services/ApiServices';
import './EditRecipeForm.css';

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
    const [selectedFile, setSelectedFile] = useState(null);

    const [errors, setErrors] = useState({
        title: null,
        description: null,
        time: null,
        category: null,
        difficulty: null,
        ingredients: null,
        preparation: null,
        country: null,
        image: null
    })
    const navigate = useNavigate()
    const { id } = useParams()

    const handleFileInputChange = (e) => {
        const selectedFile = e.target.files[0];
        setImage(selectedFile);
        setSelectedFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('time', time);
        formData.append('category', category);
        formData.append('difficulty', difficulty);
        formData.append('ingredients', ingredients);
        formData.append('preparation', preparation);
        formData.append('country', country);
        formData.append('image', image);

        try {
            const response = await updateRecipe(id, formData);
            if (response.errors) {
                console.log('Errors:', response.errors);
            } else {
                swal("Success", response.message, "success");
                navigate(`/recipe/${response.recipe.id}`);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            const errors = error.response.data.errors
            setErrors({ title: errors.title && errors.title[0], description: errors.description && errors.description[0], time: errors.time && errors.time[0], category: errors.category && errors.category[0], difficulty: errors.difficulty && errors.difficulty[0], ingredients: errors.ingredients && errors.ingredients[0], preparation: errors.preparation && errors.preparation[0], country: errors.country && errors.country[0], image: errors.image && errors.image[0], });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRecipeById(id);
                if (data.recipe.user_id !== userId) {
                    navigate('/')
                    return
                }
                setTitle(data.recipe.title)
                setDescription(data.recipe.description)
                setTime(data.recipe.time)
                setCategory(data.category)
                setDifficulty(data.recipe.difficulty)
                setIngredients(data.recipe.ingredients)
                setPreparation(data.recipe.preparation)
                setCountry(data.recipe.country)
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
            <form className="d-flex flex-column justify-content-around reg-form" onSubmit={handleSubmit} encType="multipart/form-data">

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
                    errors.title && <div className="error-text text-center">
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
                    errors.description && <div className="error-text text-center">
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
                    errors.time && <div className="error-text text-center">
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
                        <option value="Primero">Primero</option>
                        <option value="Segundo">Segundo</option>
                        <option value="Postre">Postre</option>
                    </select>
                </div>

                {
                    errors.category && <div className="error-text text-center">
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
                    errors.difficulty && <div className="error-text text-center">
                        <p>{errors.difficulty}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="ingredients" className="fw-bold label-text text">Ingredientes</label>
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        type="text"
                        name="ingredients"
                        className="input-style-1 input-height-2 b-r"
                    />
                </div>

                {
                    errors.ingredients && <div className="error-text text-center">
                        <p>{errors.ingredients}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="preparation" className="fw-bold label-text text">Preparación</label>
                    <textarea
                        value={preparation}
                        onChange={(e) => setPreparation(e.target.value)}
                        type="text"
                        name="preparation"
                        className="input-style-1 input-height-3 b-r"
                    />
                </div>

                {
                    errors.preparation && <div className="error-text text-center">
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
                    errors.country && <div className="error-text text-center">
                        <p>{errors.country}</p>
                    </div>
                }

                <div className="d-flex flex-column">
                    <label htmlFor="image" className="fw-bold label-text text">Imagen</label>
                    <div className='select d-active'>Selecciona</div>
                    <input
                        onChange={handleFileInputChange}
                        type="file"
                        name="image"
                        accept="image/*"
                        className="display-none top-42"
                    />
                    {selectedFile && <p>Archivo seleccionado: {selectedFile.name}</p>}
                </div>

                {
                    errors.image && <div className="error-text text-center">
                        <p>{errors.image}</p>
                    </div>
                }

                <div className="d-flex justify-content-between">
                    <Link to={`/profile`}><Button backgroundColorClass="bttn-primary" text="Cancelar" widthClass="simpleW" /></Link>
                    <Button backgroundColorClass="bttn-secondary" text="Añadir" />
                </div>

            </form>
        </div>
    )
}

export default EditRecipeForm
