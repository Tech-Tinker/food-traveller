import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/Logo.svg';
import Avatar from '../../assets/Avatar.svg';
// eslint-disable-next-line
import Menu from '../../assets/Menu.svg';
import MenuBurguer from '../menu-burguer/MenuBurguer';


const Header = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';
  const isProfilePage = location.pathname === '/profile';
  const isCreateRecipe = location.pathname === '/create-recipe';
  // const isEditPage = location.pathname === '/edit';

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // eslint-disable-next-line
  const handleLogin = () => {
    setIsLoggedIn(false);
  };

  return (

    <div className='d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>
        <img className='logo-header' src={Logo} alt='Logo Foodtraveller' />
      </Link>
      <MenuBurguer currentPage={currentPage} />
      {!isLoginPage && !isRegisterPage && !isLoggedIn && !isCreateRecipe && (
        <Link to={'/login'}>
          <img src={Avatar} alt='Icono de Login' />
        </Link>
      )}


    </div>
  );
};

export default Header;

