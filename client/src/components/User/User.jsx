import React, { useEffect, useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('auth_token');
const id_user = localStorage.getItem('auth_user_id');

const User = () => {
  const [profileData, setProfileData] = useState(null);
  

  useEffect(() => {
    const obtenerPerfilUsuario = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id_user}`, config); 
      
        setProfileData(response.data);
      } catch (error) {
        console.error(error);
        throw new Error('No se pudo obtener el perfil de usuario');
      }
    };

    obtenerPerfilUsuario();
  }, []);

  console.log(profileData)
  return (
    <div>
      {profileData ? (
        <div>
          <h2>Perfil de usuario:</h2>
          <p>Nombre: {profileData.data.name}</p>
          <p>Email: {profileData.data.email}</p>
        </div>
      ) : (
        <div>Cargando perfil de usuario...</div>
      )}
    </div>
  );
};

export default User;