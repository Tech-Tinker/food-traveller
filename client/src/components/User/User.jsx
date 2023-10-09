import React, { useEffect, useState } from 'react';
import AvatarGray from '../../assets/AvatarGray.svg';
import { getProfile } from '../../services/ApiServices';

const User = ({ continent }) => {
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

  const getBorderColor = () => {
    const continentColors = {
      Africa: 'red',
      Europe: 'blue',
      Asia: 'yellow',
      Americas: 'orange',
      Oceania: 'purple',
    };

    return continentColors[continent] || 'grey';
  };

  return (
    <div className="d-flex flex-column">
      {isLoading ? (
        <div>Cargando perfil de usuario...</div>
      ) : (
        <div className="d-flex flex-column align-items-start mb-4">
          <div
            className="avatar-upload"
            style={{
              maxWidth: '120px',
              maxHeight: '120px',
              overflow: 'hidden',
              marginRight: '15px',
              marginBottom: '15px',
            }}
          >
            <div
              className="d-flex justify-content-center selected-image-container"
              style={{
                border: `5px solid ${getBorderColor()}`,
                borderRadius: '50%',
                width: '100%',
                height: '100%',
              }}
            >
              <img
                src={profileImageUrl || AvatarGray}
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
            <p className="fw-bold mb-0">{user_name}</p>
            <p className="mb-1">{description}</p>
            <p className="mb-1">
              {culinary_experience}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;









