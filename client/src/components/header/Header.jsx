import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/Logo.svg';
import Avatar from '../../assets/Avatar.svg';
import MenuBurguer from '../menu-burguer/MenuBurguer';


const Header = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  return (

    <div className='d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>
        <img className='logo-header' src={Logo} alt='Logo Foodtraveller' />
      </Link>

      {isLoggedIn && (currentPage === '/' || currentPage === '/profile' || currentPage === '/result' || currentPage === '/create-recipe' || currentPage.match(/^\/edit-recipe\/\d+$/)) && (
        <MenuBurguer currentPage={currentPage} />
      )}

      {!isLoggedIn && currentPage === '/' && (
        <Link to={'/login'}>
          <img src={Avatar} alt='Icono de Login' />
        </Link>
      )}
    </div>
  );
};

export default Header;

