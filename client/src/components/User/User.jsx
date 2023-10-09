import React, { useEffect, useState } from 'react';
import AvatarGray from '../../assets/AvatarGray.svg';
import { getProfile } from '../../services/ApiServices';
import './User.css';

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

  // eslint-disable-next-line
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
    <div className="d-flex flex-column pad-2">
      {isLoading ? (
        <div>Cargando perfil de usuario...</div>
      ) : (
        <div className="d-flex flex-column mb-4 align-mobile align-desktop">
          <div className="avatar-upload" >
            <div className="d-flex justify-content-center sel-image-container">
              <img
                src={profileImageUrl || AvatarGray}
                alt="Avatar"
                className="selected-image b-r50"
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









