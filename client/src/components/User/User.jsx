import React, { useEffect, useState } from 'react';
import Foto from '../../assets/Foto.png';
import { getProfile } from '../../services/ApiServices';

const User = ({ country, continent }) => {
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getUserProfile = async () => {
      try {
        const response = await getProfile();
        setProfileData(response);
      } catch (error) {
        console.error(error);
        throw new Error('No se pudo obtener el perfil de usuario');
      }

      setIsLoading(false);
    };
    getUserProfile();
  }, []);

  const { user_name, description, culinary_experience } = profileData.profile || {};

  const profileImageUrl = profileData.image_url;

  // Función para obtener el color del continente
  const getBorderColor = () => {
    const continentColors = {
      Africa: 'red',
      Europe: 'blue',
      Asia: 'yellow',
      Americas: 'orange',
      Oceania: 'purple',
    };
    // Utiliza el color del continente o un valor predeterminado si no se encuentra
    return continentColors[continent] || 'grey';
  };

  return (
    <div className="d-flex flex-column">
      {isLoading ? (
        <div>Cargando perfil de usuario...</div>
      ) : (
        <div className="d-flex flex-column align-items-start">
          <div
            className="avatar-upload"
            style={{
              maxWidth: '120px', 
              maxHeight: '120px', 
              overflow: 'hidden', 
              marginRight: '15px', 
            }}
          >
            <div
              className="d-flex justify-content-center align-items-center selected-image-container"
              style={{
                border: `5px solid ${getBorderColor()}`, // Establece el color del borde basado en el continente
                borderRadius: '50%',
                width: '100%', 
                height: '100%', 
              }}
            >
              <img
                src={profileImageUrl || Foto}
                alt="Avatar"
                className="selected-image b-r50"
                style={{
                  maxWidth: '100%', 
                  maxHeight: '100%', 
                  borderRadius: '50%', 
                }}
              />
            </div>
          </div>
          <div className="d-flex flex-column">
          <p className="fw-bold">{user_name}</p>
            <p className="">{description}</p>
            <p className="">
              {culinary_experience}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;







