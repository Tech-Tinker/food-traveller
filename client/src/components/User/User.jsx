
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Foto from '../../assets/Ellipse 35.png';
import { getUserById } from '../../services/ApiServices';

// const token = localStorage.getItem('auth_token');
// const id_user = localStorage.getItem('auth_user_id');

const User = () => {

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // };
        const response = await getUserById();

        // console.log(response);
        setProfileData(response);
      } catch (error) {
        console.error(error);
        throw new Error('No se pudo obtener el perfil de usuario');
      }
    };
    // console.log(setProfileData);
    getUserProfile();
  }, []);

  // eslint-disable-next-line
  const { user_name, profile_image, description, birthdate, country, interests, culinary_experience } = profileData.profile || {}

  return (
    <div>
      {profileData ? (
        <div>
          <img src={Foto} alt="Foto de perfil" className="rounded-circle bg-secondary mx-4" />
          <p className="mx-4 font-weight-bold">Nombre: {user_name}</p>
          <p className="mx-4 font-weight-bold">Dscripción: {description}</p>
          <p className="mx-4 font-weight-bold">Fecha de Nacimiento: {birthdate}</p>
          <p className="mx-4 font-weight-bold">País: {country}</p>
          <p className="mx-4 font-weight-bold">Me interesa la comida: {interests}</p>
          <p className="mx-4 font-weight-bold">En la cocina me considero: {culinary_experience}</p>
        </div>
      ) : (
        <div>Cargando perfil de usuario...</div>
      )}
    </div>
  );
};

export default User;





