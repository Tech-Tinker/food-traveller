import React from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/login.svg'; 

const Header = () => {
  return (
    <div className='header'>
      <Link to={'/'}>Logo</Link>
      
      <Link to={'/login'}>
        <img src={login} alt="Avatar login" />
      </Link>
      
    </div>
  );
}

export default Header;
