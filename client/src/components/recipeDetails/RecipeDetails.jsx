import React, { useEffect, useState } from 'react';
import './RecipeDetails.css';
import { Link, useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/ApiServices';
import Back from '../../assets/Back.svg';
import Cookware from '../../assets/Cookware.svg';
import Watch from '../../assets/Watch.svg';

const RecipeDetails = () => {
  const [show, setShow] = useState({});
  const [selectedSection, setSelectedSection] = useState('description');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showData = await getRecipeById(id);
        setShow(showData);
      } catch (error) {
        console.error('Error fetching show info:', error);
      }
    };

    fetchData();
  }, [id]);

  const { title, country, difficulty, time, description, ingredients, preparation } = show.recipe || {};
  const username = show.username || '';
  const category = show.category || '';
  const image = show.image_url;

  const renderIngredients = ingredients && ingredients.split('\n').map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  const renderPreparation = preparation && preparation.split('\n').map((step, index) => (
    <li key={index}>{step}</li>
  ));

  return (
    <div className="padding-1-5 padding-1-5-4">
      <div className="pb-desktop padding-b-3">
        <Link to={`/`}><img src={Back} alt="Go back icon" /></Link>
      </div>
      <h1 className="fw-bold">{title}</h1>
      <img src={image} alt="" className="pt-2 pb-2 w-image" />
      <h2>{username}</h2>
      <p className="country">{country}</p>
      <div className="d-flex justify-content-between buttons mt-2 mb-2">
        <button className={selectedSection === 'description' ? 'recipe-btn active' : 'recipe-btn'} onClick={() => setSelectedSection('description')}>General</button>
        <button className={selectedSection === 'ingredients' ? 'recipe-btn active' : 'recipe-btn'} onClick={() => setSelectedSection('ingredients')}>Ingredientes</button>
        <button className={selectedSection === 'preparation' ? 'recipe-btn active' : 'recipe-btn'} onClick={() => setSelectedSection('preparation')}>Preparación</button>
      </div>
      <div className="general d-flex justify-content-evenly">
        <div className="d-flex justify-content-around align-items-center gap">
          <img src={Cookware} alt=""></img>
          <p className="m-0">{difficulty}</p>
        </div>
        <div className="d-flex justify-content-around align-items-center gap">
          <img src={Watch} alt=""></img>
          <p className="m-0">{time}</p>
        </div>
        <div className="d-flex justify-content-around align-items-center gap">
          <p className="m-0">{category}</p>
        </div>
      </div>
      <div className="show-text">
        {selectedSection === 'description' && <p>{description}</p>}
        {selectedSection === 'ingredients' && <ul>{renderIngredients}</ul>}
        {selectedSection === 'preparation' && <ul>{renderPreparation}</ul>}
      </div>
    </div>
  );
}

export default RecipeDetails;

