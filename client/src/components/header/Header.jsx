import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/Logo.svg';
import Avatar from '../../assets/Avatar.svg';
import Edit from '../../assets/Edit.svg';
import AvatarGray from '../../assets/AvatarGray.svg';
import Logout from '../../assets/Logout.svg';
import MenuBurguer from '../menu-burguer/MenuBurguer';


const Header = (props) => {
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

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      if (props.homeEvent) {
        props.homeEvent();
      }
    }
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
      <Link to={'/'} onClick={handleLogoClick}>
        <img className='logo-header' src={Logo} alt='Logo Foodtravel' />
      </Link>

      {(isLoggedIn && (
        isLargeScreen) && (
          <div className="menu-links d-flex justify-content-between align-items-center">
            {(currentPage === '/' || currentPage === '/create-recipe' || currentPage.match(/^\/edit-recipe\/\d+$/)) && (
              <>
                <Link to={'/profile'} className="link-style-none">
                  <img src={AvatarGray} alt="Mi Perfil" />
                  <span className="mx-2">Mi Perfil</span>
                </Link>
                <div className="list-item pointer" onClick={handleLogout}>
                  <img src={Logout} alt="Cerrar Sesión" />
                  <span className="mx-2">Cerrar Sesión</span>
                </div>
              </>
            )}

            {(currentPage === '/profile') && (
              <>
                <Link to={'/edit-profile'} className="link-style-none">
                  <img src={Edit} alt="Mi Perfil" />
                  <span className="mx-2">Editar Perfil</span>
                </Link>
                <div className="list-item pointer" onClick={handleLogout}>
                  <img src={Logout} alt="Cerrar Sesión" />
                  <span className="mx-2">Cerrar Sesión</span>
                </div>
              </>
            )}

          </div>
        ))}

      {isLoggedIn && (
        !isLargeScreen) && (currentPage === '/' || currentPage === '/profile' || currentPage === '/create-recipe' || currentPage.match(/^\/edit-recipe\/\d+$/)) && (
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

