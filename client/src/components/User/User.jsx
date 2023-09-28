
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Foto from '../../assets/Ellipse 35.png';

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

  return (
    <div>
      {profileData ? (
        <div>
          <img src={Foto} alt="Foto de perfil" className="rounded-circle bg-secondary mx-4" />
          <p className="mx-4 font-weight-bold">Nombre: {profileData.data.name}</p>
          <p className="mx-4 font-weight-bold">Descripción {profileData.data.email}</p>
          <p className="mx-4 font-weight-bold">Fecha de Nacimiento {profileData.data.email}</p>
          <p className="mx-4 font-weight-bold">País {profileData.data.email}</p>
          <p className="mx-4 font-weight-bold">Me interesa la comida {profileData.data.email}</p>
          <p className="mx-4 font-weight-bold">En la cocina me considero {profileData.data.email}</p>
        </div>
      ) : (
        <div>Cargando perfil de usuario...</div>
      )}
    </div>
  );
};

export default User;





