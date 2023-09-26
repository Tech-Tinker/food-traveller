import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import Logo from '../../assets/Logo.svg';
import Avatar from '../../assets/Avatar.svg'

const Header = () => {
  return (
    <div className='d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>
        <img className='logo'src={Logo} alt="Logo Foodtraveller" />
      </Link>

      <Link to={'/login'}>
        <img src={Avatar} alt="Icono de Login" />
      </Link>

      

    </div>
  );
}

export default Header;


{/* <Link to={'/login'}>
        <img src={Menu} alt="" />
      </Link> */}