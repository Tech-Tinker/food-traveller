import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './Header.css'
import Logo from '../../assets/Logo.svg';
import Avatar from '../../assets/Avatar.svg'

const Header = () => {
  const location = useLocation(); 
  const isLoginPage = location.pathname === "/login";

  return (
    <div className='d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>
        <img className='logo'src={Logo} alt="Logo Foodtraveller" />
      </Link>

      {!isLoginPage && (
        <Link to={'/login'}>
          <img src={Avatar} alt="Icono de Login" />
        </Link>
      )}
    </div>
  );
}

export default Header;