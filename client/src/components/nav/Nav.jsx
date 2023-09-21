import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import landing from '../../assets/landing.svg';
import search from '../../assets/search.svg';
import create from '../../assets/create.svg';
import favorites from '../../assets/favorites.svg';
import login from '../../assets/login.svg';

const Nav = () => {

  return (
    <footer className='nav-footer'>
      <Link to={'/'}>
        <img src={landing} alt="Landing page Icon" />
      </Link>

      <Link to={'/search'}>
        <img src={search} alt="Search Icon" />
      </Link>

      <Link to={'/create-recipe'}>
        <img src={create} alt="Create Icon" />
      </Link>

      <Link to={'/favorites'}>
        <img src={favorites} alt="Favorites Icon" />
      </Link>

      <Link to={'/login'}>
        <img src={login} alt="Login Icon" />
      </Link>

    </footer>
  );
}

export default Nav;



