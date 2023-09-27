import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/logo.svg';
import Login from '../../assets/icon-login.svg';

const Header = ({ isLoggedIn, onLogout, isPerfilPage }) => {
    const handleLogout = () => {
        if (typeof onLogout === 'function') {
            onLogout();
        }
    };

    return (
        <div className='d-flex justify-content-between align-items-center header-margin'>
            <Link to={'/'}>
                <img src={Logo} alt="" />
            </Link>

            <Link to={'/login'}>
                <img src={Login} alt="" />
            </Link>

            {isLoggedIn ? (
                <>
                    <Link to={'/perfil'}>Perfil</Link>
                    {isPerfilPage && <Link to={'/editar-perfil'}>Editar Perfil</Link>}
                    <Link to={'/create-recipe'}>Crear Receta</Link>
                    <Link to={'/recipes'}>Recetas</Link>
                    <button onClick={handleLogout}>Cerrar Sesión</button>
                </>
            ) : null}
        </div>
    );
}

export default Header;
