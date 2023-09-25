import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/Avatar.svg';
import './Header.css'

const Header = () => {
  return (
    <div className='d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>Logo</Link>
      <Link to={'/perfil'}>Perfil</Link>

      <Link to={'/login'}>
        <img src={Avatar} alt="Avatar login" />
      </Link>

    </div>
  );
}

export default Header;
