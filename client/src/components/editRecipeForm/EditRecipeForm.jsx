import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Button from '../button/Button';
import { getRecipeById, updateRecipe } from '../../services/ApiServices';
import './EditRecipeForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EditRecipeForm = () => {

  const userId = Number(localStorage.getItem('auth_user_id'));

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('')
  const [category, setCategory] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  // eslint-disable-next-line
  const [preparationStep, setPreparationStep] = useState('');
  const [preparationSteps, setPreparationSteps] = useState([]);
  const [country, setCountry] = useState('')
  const [image, setImage] = useState('')
  // eslint-disable-next-line
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

  const handleAddIngredient = () => {
    if (ingredient) {
      setIngredientsList([...ingredientsList, ingredient]);
      setIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredientsList = [...ingredientsList];
    updatedIngredientsList.splice(index, 1);
    setIngredientsList(updatedIngredientsList);
  };

  const handleAddStep = () => {
    setPreparationSteps([...preparationSteps, '']);
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = [...preparationSteps];
    updatedSteps.splice(index, 1);
    setPreparationSteps(updatedSteps);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...preparationSteps];
    updatedSteps[index] = value;
    setPreparationSteps(updatedSteps);
  };

  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const data = response.data;
        const countryOptions = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
        }));

        countryOptions.sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countryOptions);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('time', time);
    formData.append('category', category);
    formData.append('difficulty', difficulty);
    formData.append('ingredients', ingredientsList.join('\n'));
    formData.append('preparation', preparationSteps.join('\n'));
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
        setIngredientsList(data.recipe.ingredients.split('\n'));
        setPreparationSteps(data.recipe.preparation.split('\n'));
        setCountry(data.recipe.country)
      } catch (error) {
        console.error('Error fetching recipe by ID:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Editar receta</div>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? "is-invalid" : ""
                      }`}
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {errors.title && (
                  <div className="error-text text-center">
                    <p>{errors.title}</p>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    className={`form-control ${errors.description ? "is-invalid" : ""
                      }`}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                {errors.description && (
                  <div className="error-text text-center">
                    <p>{errors.description}</p>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    Tiempo de preparación
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.time ? "is-invalid" : ""
                      }`}
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>

                {errors.time && (
                  <div className="error-text text-center">
                    <p>{errors.time}</p>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categoría
                  </label>
                  <select
                    className={`form-select ${errors.category ? "is-invalid" : ""
                      }`}
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Selecciona">Selecciona</option>
                    <option value="Entrante">Entrante</option>
                    <option value="Primer Plato">Primer Plato</option>
                    <option value="Segundo Plato">Segundo Plato</option>
                    <option value="Postre">Postre</option>
                  </select>
                </div>

                {errors.category && (
                  <div className="error-text text-center">
                    <p>{errors.category}</p>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="difficulty" className="form-label">
                    Dificultad
                  </label>
                  <select
                    className={`form-select ${errors.difficulty ? "is-invalid" : ""
                      }`}
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="Selecciona">Selecciona</option>
                    <option value="Fácil">Fácil</option>
                    <option value="Intermedia">Intermedia</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                  {errors.difficulty && (
                    <div className="invalid-feedback">
                      {errors.difficulty}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="ingredient" className="form-label">
                    Ingredientes
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className={`form-control ${errors.ingredients ? "is-invalid" : ""
                        }`}
                      id="ingredient"
                      value={ingredient}
                      onChange={(e) => setIngredient(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-danger ingredient-button"
                      onClick={handleAddIngredient}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>

                {errors.ingredients && (
                  <div className="error-text text-center">
                    <p>{errors.ingredients}</p>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Lista de Ingredientes</label>
                  <ul className="list-group">
                    {ingredientsList.map((item, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {item}
                        <button
                          type="button"
                          className="btn btn-danger ingredient-button"
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-3">
                  <label className="form-label">Preparación</label>
                  <ul className="list-group">
                    {preparationSteps.map((step, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="input-group">
                          <input
                            type="text"
                            className={`form-control ${errors.preparation ? "is-invalid" : ""
                              }`}
                            value={step}
                            onChange={(e) =>
                              handleStepChange(index, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            className="btn btn-danger ingredient-button"
                            onClick={() => handleRemoveStep(index)}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    className="btn btn-step"
                    onClick={handleAddStep}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                    Agregar Paso
                  </button>
                </div>

                {errors.preparation && (
                  <div className="error-text text-center">
                    <p>{errors.preparation}</p>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    País
                  </label>
                  <br />
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    name="country"
                    className=" w-100 p-2 rounded-2"
                  >
                    <option value="">Selecciona un país</option>
                    {isLoading ? (
                      <option value="" disabled>
                        Cargando países...
                      </option>
                    ) : (
                      countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {errors.country && (
                  <div className="error-text text-center">
                    <p>{errors.country}</p>
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Imagen
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileInputChange}
                  />
                </div>

                {errors.image && (
                  <div className="error-text text-center">
                    <p>{errors.image}</p>
                  </div>
                )}

                <div className="d-flex justify-content-between">
                  <Link to={`/profile`}>
                    <Button
                      backgroundColorClass="bttn-primary"
                      text="Cancelar"
                      widthClass="simpleW"
                    />
                  </Link>
                  <Button
                    backgroundColorClass="bttn-secondary"
                    text="Añadir"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeForm;
