import React from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/login.svg';
import './Header.css'

const Header = () => {
  return (
    <div className='d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>Logo</Link>
      <Link to={'/perfil'}>Perfil</Link>

      <Link to={'/login'}>
        <img src={login} alt="Avatar login" />
      </Link>

    </div>
  );
}

export default Header;
