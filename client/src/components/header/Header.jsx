import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/Logo.svg';
import Avatar from '../../assets/Avatar.svg';
import Edit from '../../assets/Edit.svg';
import AvatarGray from '../../assets/AvatarGray.svg';
import Logout from '../../assets/Logout.svg';
import MenuBurguer from '../menu-burguer/MenuBurguer';


const Header = () => {
  const location = useLocation();
  const currentPage = location.pathname;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1280);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (token) {
      setIsLoggedIn(true);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 1280);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_name');
    localStorage.removeItem('auth_user_id');
    navigate('/');
    window.location.reload();
  };

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

