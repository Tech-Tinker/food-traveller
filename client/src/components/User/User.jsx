
import React, { useEffect, useState } from 'react';
import Foto from '../../assets/Ellipse 35.png';
import { getUserById } from '../../services/ApiServices';


const User = () => {

  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await getUserById();

        setProfileData(response);
      } catch (error) {
        console.error(error);
        throw new Error('No se pudo obtener el perfil de usuario');
      }
    };
    getUserProfile();
  }, []);

  // eslint-disable-next-line
  const { user_name, profile_image, description, birthdate, country, interests, culinary_experience } = profileData.profile || {}

  return (
    <div>
      {profileData ? (
        <div>
          <img src={Foto} alt="Foto de perfil" className="rounded-circle bg-secondary mx-4" />
          <p className="mx-4 font-weight-bold">{user_name}</p>
          <p className="mx-4 font-weight-bold">{country}</p>
          <p className="mx-4 font-weight-bold">{description}</p>
          {/* <p className="mx-4 font-weight-bold">Fecha de Nacimiento: {birthdate}</p> */}
          <p className="mx-4 font-weight-bold">Me interesa...{interests}</p>
          <p className="mx-4 font-weight-bold">En la cocina me considero... {culinary_experience}</p>
        </div>
      ) : (
        <div>Cargando perfil de usuario...</div>
      )}
    </div>
  );
};

export default User;





