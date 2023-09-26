import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/logo.svg'
import Login from '../../assets/icon-login.svg'

const Header = () => {
  return (
    <div className='header-container d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>
        <img className='logo-header' src={Logo}/>
      </Link>
      <Link to={'/perfil'}>Perfil</Link>

      <Link to={'/login'}>
        <img className='login-header' src={Login} alt="Avatar login" />
      </Link>

    </div>
  );
}

export default Header;
