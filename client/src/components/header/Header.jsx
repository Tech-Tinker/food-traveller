import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
// import Logo from '../../assets/';
import Menu from '../../assets/Menu.svg';

const Header = () => {
  return (
    <div className='d-flex justify-content-between align-items-center header-margin'>
      <Link to={'/'}>
        {/* <img src={Logo} alt="" /> */}
      </Link>

      {/* {<Link to={'/perfil'}>Perfil</Link>} */}

      <Link to={'/login'}>
        <img src={Menu} alt="" />
      </Link>

    </div>
  );
}

export default Header;
