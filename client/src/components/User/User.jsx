import React, { useEffect, useState } from 'react';
import Foto from '../../assets/Foto.png';
import { getProfile } from '../../services/ApiServices';
import Profilerecipes from '../Profile-Recipes/Profilerecipes'; // Importa el componente Profilerecipes

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
        <div className="d-flex flex-column align-items-start mb-4"> {/* Aplicamos la clase "mb-4" para agregar espacio inferior */}
          <div
            className="avatar-upload"
            style={{
              maxWidth: '120px', 
              maxHeight: '120px', 
              overflow: 'hidden', 
              marginRight: '15px', 
              marginBottom: '15px', // Añadimos margen inferior para igualar el margen de la imagen
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
            <p className="fw-bold mb-0">{user_name}</p> {/* Eliminamos el margen inferior para el título */}
            <p className="mb-1">{description}</p> {/* Aplicamos la clase "mb-1" para reducir la separación */}
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









