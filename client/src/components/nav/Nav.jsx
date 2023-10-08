import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import Home from '../../assets/Home.svg';
import Search from '../../assets/Search.svg';
import Create from '../../assets/Create.svg';
import Avatar from '../../assets/Avatar.svg';

const Nav = () => {

  return (
    <div className='nav-footer'>
      <Link to={'/'}>
        <img src={Home} alt="Home Icon" />
      </Link>

      <Link to="/search">
        <img src={Search} alt="Search Icon" />
      </Link>

      <Link to={'/create-recipe'}>
        <img src={Create} alt="Create Icon" />
      </Link>

      <Link to={'/profile'}>
        <img src={Avatar} alt="Login Icon" />
      </Link>

    </div>
  );
}

export default Nav;



