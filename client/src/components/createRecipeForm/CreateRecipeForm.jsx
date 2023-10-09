import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import Button from '../button/Button';
import '../createRecipeForm/CreateRecipeForm.css';
import { storeRecipe } from '../../services/ApiServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CreateRecipeForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState([]);
  const [preparationStep, setPreparationStep] = useState('');
  const [preparationSteps, setPreparationSteps] = useState([]);
  const [country, setCountry] = useState('');
  const [image, setImage] = useState('');

  const [errors, setErrors] = useState({
    title: null,
    description: null,
    time: null,
    category: null,
    difficulty: null,
    ingredients: null,
    preparation: null,
    country: null,
    image: null,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageChange = (e) => {
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
    if (preparationStep.trim() !== '') {
      setPreparationSteps([...preparationSteps, preparationStep]);
      setPreparationStep('');
    }
  };

  const handleRemoveStep = (index) => {
    const updatedSteps = [...preparationSteps];
    updatedSteps.splice(index, 1);
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
    formData.append('preparation', preparationSteps);
    formData.append('country', country);
    formData.append('image', image);

    try {
      const response = await storeRecipe(formData);

      if (response.errors) {
        console.log('Errors:', response.errors);
      } else {
        swal('Success', response.message, 'success');
        navigate(`/recipe/${response.id}`);
      }
    } catch (error) {
      console.error('Error creating recipe:', error);
      const errors = error.response.data.errors;

      setErrors({
        title: errors.title && errors.title[0],
        description: errors.description && errors.description[0],
        time: errors.time && errors.time[0],
        category: errors.category && errors.category[0],
        difficulty: errors.difficulty && errors.difficulty[0],
        country: errors.country && errors.country[0],
        image: errors.image && errors.image[0],
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Nueva receta</div>

            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <style>
                  {`
                      .form-control {
                        boxShadow: 0px 0px 5px #BB9B8E;
                      }
                    `}
                </style>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Título
                  </label>
                  <input
                    placeholder="Ejemplo: Ensalada César con pollo"
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''
                      }`}
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && (
                    <div className="invalid-feedback">{errors.title}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Descripción
                  </label>
                  <textarea
                    placeholder="Ejemplo: Una deliciosa ensalada con pollo y aderezo cremoso."
                    className={`form-control ${errors.description ? 'is-invalid' : ''
                      }`}
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {errors.description && (
                    <div className="invalid-feedback">
                      {errors.description}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="time" className="form-label">
                    Tiempo de preparación
                  </label>
                  <input
                    placeholder="Ejemplo: 30 m"
                    type="text"
                    className={`form-control ${errors.time ? 'is-invalid' : ''
                      }`}
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                  {errors.time && (
                    <div className="invalid-feedback">{errors.time}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categoría
                  </label>
                  <select
                    className={`form-select ${errors.category ? 'is-invalid' : ''
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
                  {errors.category && (
                    <div className="invalid-feedback">{errors.category}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="difficulty" className="form-label">
                    Dificultad
                  </label>
                  <select
                    className={`form-select ${errors.difficulty ? 'is-invalid' : ''
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
                      placeholder="Ejemplo: - 50 ml de aceite de oliva virgen extra"
                      type="text"
                      className={`form-control ${errors.ingredients ? 'is-invalid' : ''
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
                  {errors.ingredients && (
                    <div className="invalid-feedback">
                      {errors.ingredients}
                    </div>
                  )}
                </div>

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
                  <label htmlFor="preparation" className="form-label">
                    Preparación
                  </label>
                  <div className="input-group">
                    <input
                      placeholder="Ejemplo: 1 Para hacer el aliño o salsa César, picamos las anchoas..."
                      type="text"
                      className={`form-control ${errors.preparation ? 'is-invalid' : ''
                        }`}
                      id="preparation"
                      value={preparationStep}
                      onChange={(e) => setPreparationStep(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-success ingredient-button"
                      onClick={handleAddStep}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                  {errors.preparation && (
                    <div className="invalid-feedback">{errors.preparation}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Lista de Preparación</label>
                  <ul className="list-group">
                    {preparationSteps.map((step, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {step}
                        <button
                          type="button"
                          className="btn btn-danger ingredient-button"
                          onClick={() => handleRemoveStep(index)}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

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

                {
                  errors.country && <div className="error-text text-center">
                    <p>{errors.country}</p>
                  </div>
                }

                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    Imagen
                  </label>
                  <div className='select d-active'>Selecciona</div>
                  <input
                    className="form-control"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {selectedFile && (
                    <p>Archivo seleccionado: {selectedFile.name}</p>
                  )}
                  {errors.image && (
                    <div className="invalid-feedback">{errors.image}</div>
                  )}
                </div>

                <div className="d-flex justify-content-between">
                  <Link to={`/`}>
                    <Button
                      backgroundColorClass="bttn-primary"
                      text="Cancelar"
                    />
                  </Link>
                  <Button backgroundColorClass="bttn-secondary" text="Añadir" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipeForm;