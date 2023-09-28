import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './MenuBurguer.css';
import AvatarGray from '../../assets/AvatarGray.svg';
import Logout from '../../assets/Logout.svg';


const MenuBurguer = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="menu-hamburguesa">
      <div className="menu-icon" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      {menuVisible && (
        <ul className="menu-list">

          <li>
            <img src={AvatarGray} alt="Mi Perfil" />
            <span>Mi Perfil</span>
          </li>
          <li>
            <img src={Logout} alt="Cerrar Sesión" />
            <span>Cerrar Sesión</span>
          </li>
          {/* Agrega más elementos de menú según sea necesario */}
        </ul>
      )}
    </div>
  );
};

export default MenuBurguer;
