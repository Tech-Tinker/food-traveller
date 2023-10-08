import React from 'react';
import './Nav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Home from '../../assets/Home.svg';
import Search from '../../assets/Search.svg';
import Create from '../../assets/Create.svg';
import Avatar from '../../assets/Avatar.svg';

const Nav = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      if (props.homeEvent) {
        props.homeEvent();
      }
    }
  };

  const handleSearchIconClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    const searchBarElement = document.getElementById('searchBar');
    if (searchBarElement) {
      searchBarElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='nav-footer'>
      <Link to={'/'} onClick={handleLogoClick}>
        <img src={Home} alt="Home Icon" />
      </Link>

      <Link to="#" onClick={handleSearchIconClick}>
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



