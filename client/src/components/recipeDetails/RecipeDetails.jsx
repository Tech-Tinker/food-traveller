import React, { useEffect, useState } from 'react';
import './RecipeDetails.css';
import { Link, useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/ApiServices';
import Back from '../../assets/Back.svg';
import Cookware from '../../assets/Cookware.svg';
import Watch from '../../assets/Watch.svg';
import Rating from '../rating/Rating';



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

  const { title, country, difficulty, time, description, ingredients, preparation, image_url } = show.recipe || {};

  const username = show.username || ''

  const category = show.category || ''

  const image = show.image_url

  return (
    <div className="padding">
      <div className="pb-3">
        <Link to={`/`}><img src={Back} alt="Go back icon" /></Link>
      </div>
      <Rating />

      <h1 className="fw-bold">{title}</h1>
      <img src={image_url} alt="" className="pt-2 pb-2 w-image" />
      <div className='recipe-foto'> FOTO de la comida!</div>
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
        {selectedSection === 'ingredients' && <p>{ingredients}</p>}
        {selectedSection === 'preparation' && <p>{preparation}</p>}
      </div>
    </div>
  )
}


export default RecipeDetails
