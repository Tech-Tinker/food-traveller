import React, { useState } from "react";
import './MenuBurguer.css';
import AvatarGray from '../../assets/AvatarGray.svg';
import Logout from '../../assets/Logout.svg';
import Menu from '../../assets/Menu.svg';
import Edit from '../../assets/Edit.svg';
import Cruz from '../../assets/Cruz.svg';
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
    setMenuVisible(false);
    navigate('/');
  };

  return (
    <div className="menu-container">
      {menuVisible && <div className="overlay" onClick={toggleMenu}></div>}
      <div className="menu-hamburguesa">
        <div className="menu-icon" onClick={toggleMenu}>
          <img src={Menu} alt="" />
        </div>
        {menuVisible && (
          <div>
            <div className="close-icon" onClick={toggleMenu}>
              <span><img src={Cruz} alt="" /></span>
            </div>
            <ul className="menu-list">
              {currentPage === '/profile' && (
                <>
                  <li className="list-item">
                    <Link to={'/edit-profile'} className="link-style-none">
                      <img src={Edit} alt="Mi Perfil" />
                      <span className="mx-2">Editar Perfil</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleLogout}>
                    <img src={Logout} alt="Cerrar Sesión" />
                    <span className="mx-2">Cerrar Sesión</span>
                  </li>
                </>
              )}

              {['/', '/create-recipe', `/edit-recipe/${id}`].includes(currentPage) && (
                <>
                  <li className="list-item">
                    <Link to={'/profile'} className="link-style-none">
                      <img src={AvatarGray} alt="Mi Perfil" />
                      <span className="mx-2">Mi Perfil</span>
                    </Link>
                  </li>
                  <li className="list-item" onClick={handleLogout}>
                    <img src={Logout} alt="Cerrar Sesión" />
                    <span className="mx-2">Cerrar Sesión</span>
                  </li>
                </>
              )}
            </ul>

          </div>
        )}
      </div>
    </div>
  );
};

export default MenuBurguer;
