
import React, { useEffect, useState } from 'react';
import Foto from '../../assets/Foto.png';
import { getProfile } from '../../services/ApiServices';


const User = () => {

  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const getUserProfile = async () => {
      try {
        const response = await getProfile();

        setProfileData(response);
      } catch (error) {
        console.error(error);
        throw new Error('No se pudo obtener el perfil de usuario');
      }

      setIsLoading(false)
    };
    getUserProfile();
  }, []);

  const { user_name, description, country, interests, culinary_experience } = profileData.profile || {}

  return (
    <div>
      {isLoading ? (
        <div>Cargando perfil de usuario...</div>
      ) : (
        <div className="d-flex flex-column justify-content-start">
          <div
            className="avatar-upload mx-auto b-r50 of-hidden b-green">
            <div
              className="d-flex justify-content-center align-items-center selected-image-container">
              <img
                src={profileData.image_url || Foto}
                alt="Avatar"
                className="selected-image b-r50" />
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-start p-4">
            <p className="fw-bold">{user_name}</p>
            <p className="">{country}</p>
            <p className="">{description}</p>
            <p className="">Me interesa la comida...{interests}</p>
            <p className="">En la cocina me considero... {culinary_experience}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;





