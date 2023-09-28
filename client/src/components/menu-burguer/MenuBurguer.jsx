import React, { useState } from "react";
import './MenuBurguer.css';
import AvatarGray from '../../assets/AvatarGray.svg';
import Logout from '../../assets/Logout.svg';
import Menu from '../../assets/Menu.svg';
import Edit from '../../assets/Edit.svg';
import { Link, useNavigate, useParams } from "react-router-dom";

const MenuBurguer = ({ currentPage }) => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_name');
    localStorage.removeItem('auth_user_id');
    navigate('/');
  };

  return (
    <div className="menu-hamburguesa">
      <div className="menu-icon" onClick={toggleMenu}>
        <img src={Menu} alt="" />
      </div>
      {menuVisible && (
        <ul className="menu-list">
          {currentPage === '/profile' && (
            <>
              <li className="list-style-none"><Link to={'/edit-profile'} className="link-style-none">
                <img src={Edit} alt="Mi Perfil" />
                <span>Editar Perfil</span></Link>
              </li>
              <li className="list-style-none" onClick={handleLogout}>
                <img src={Logout} alt="Cerrar Sesión" />
                <span>Cerrar Sesión</span>
              </li>
            </>
          )}

          {['/', '/create-recipe', `/edit-recipe/${id}`].includes(currentPage) && (
            <>
              <li className="list-style-none"><Link to={'/profile'} className="link-style-none">
                <img src={AvatarGray} alt="Mi Perfil" />
                <span>Mi Perfil</span></Link>
              </li>
              <li className="list-style-none" onClick={handleLogout}>
                <img src={Logout} alt="Cerrar Sesión" />
                <span>Cerrar Sesión</span>
              </li>
            </>
          )}

        </ul>
      )}
    </div>
  );
};

export default MenuBurguer;
