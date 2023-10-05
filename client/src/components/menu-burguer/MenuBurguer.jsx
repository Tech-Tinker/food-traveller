import React, { useState } from "react";
// import './MenuBurguer.css';
import AvatarGray from '../../assets/AvatarGray.svg';
import Logout from '../../assets/Logout.svg';
import Menu from '../../assets/Menu.svg';
import Edit from '../../assets/Edit.svg';
import Close from '../../assets/Close.svg';
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
              <li className="list-item">
                <Link to={'/edit-profile'} className="link-style-none">
                  <img src={Edit} alt="Mi Perfil" />
                  <span>Editar Perfil</span>
                </Link>
              </li>
              <li className="list-item" onClick={handleLogout}>
                <img src={Logout} alt="Cerrar Sesión" />
                <span>Cerrar Sesión</span>
              </li>
            </>
          )}

          {['/', '/create-recipe', `/edit-recipe/${id}`].includes(currentPage) && (
            <>
              <div className="list-item">
                <Link to={'/profile'} className="link-style-none">
                  <img src={AvatarGray} alt="Mi Perfil" className="icon-list-menu" />
                  <span className="mx-2">Mi Perfil</span>
                </Link>
              </div>

              <hr class="linea-horizontal link-style-none"></hr>
              
              <div className="list-item" onClick={handleLogout}>
                <img  src={Logout} alt="Cerrar Sesión" className="icon-list-menu" />
                <span className="mx-2">Cerrar Sesión</span>
              </div>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default MenuBurguer;
