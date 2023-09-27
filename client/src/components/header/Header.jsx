import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/Logo.svg';
import Login from '../../assets/icon-login.svg';

const Header = () => {
   
    return (
        <div className='d-flex justify-content-between align-items-center header-margin'>
            <Link to={'/'}>
                <img src={Logo} alt="" />
            </Link>
 {/* <Link to={'/editar-perfil'}>Editar Perfil</Link> */}
            <Link to={'/login'}>
                <img src={Login} alt="" />
            </Link>
        </div>
    );
}

export default Header;
