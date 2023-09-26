// import React from 'react';
// import './Nav.css';
// import { Link } from 'react-router-dom';
// import Home from '../../assets/Home.svg';
// import Search from '../../assets/search.svg';
// import Create from '../../assets/create.svg';
// import Avatar from '../../assets/Avatar.svg';

// const Nav = () => {

//   return (
//     <div className='nav-footer'>
//       <Link to={'/'}>
//         <img src={Home} alt="Home Icon" />
//       </Link>

//       <Link to={'/search'}>
//         <img src={Search} alt="Search Icon" />
//       </Link>

//       <Link to={'/create-recipe'}>
//         <img src={Create} alt="Create Icon" />
//       </Link>

//       <Link to={'/login'}>
//         <img src={Avatar} alt="Login Icon" />
//       </Link>

//     </div>
//   );
// }

// export default Nav;


import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import Home from '../../assets/Home.svg';
import Search from '../../assets/search.svg';
import Create from '../../assets/create.svg';
import Avatar from '../../assets/Avatar.svg';

const Nav = () => {
  // Verificar si el usuario ha iniciado sesión (por ejemplo, si existe un token en localStorage)
  const isLoggedIn = !!localStorage.getItem('auth_token');

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    // Redirigir a la página de inicio de sesión u otra página de tu elección
    window.location.href = '/login';
  };

  return (
    <div className='nav-footer'>
      <Link to={'/'}>
        <img src={Home} alt="Home Icon" />
      </Link>

      <Link to={'/search'}>
        <img src={Search} alt="Search Icon" />
      </Link>

      {isLoggedIn && (
        <>
          <Link to={'/create-recipe'}>
            <img src={Create} alt="Create Icon" />
          </Link>

          <Link to={'/profile'}>
            <img src={Avatar} alt="Profile Icon" />
          </Link>

          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      )}

      {!isLoggedIn && (
        <Link to={'/login'}>
          <img src={Avatar} alt="Login Icon" />
        </Link>
      )}
    </div>
  );
}

export default Nav;
