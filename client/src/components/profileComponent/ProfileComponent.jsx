import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileComponent.css';
import Avatar from '../../assets/Avatar.svg';
import { getUserProfile } from '../../services/ApiServices'; // Importa tu función getUserProfile desde el servicio correspondiente

const ProfileComponent = () => {
    const [userData, setUserData] = useState({});
    
    useEffect(() => {
<<<<<<< HEAD
        // Llama a tu función para obtener los datos del usuario desde el servicio
        getUserProfile()
=======
        axios.get('/api/profile')
>>>>>>> e621834266c85943c9c49847e74eb57542b92c60
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del usuario:', error);
            });
    }, []);

<<<<<<< HEAD
=======

>>>>>>> e621834266c85943c9c49847e74eb57542b92c60
    const avatarIcon = Avatar;

    return (
        <div className="profile-container">
            <div className="avatar-container">
                <img src={avatarIcon} alt="Avatar" className="avatar" />
            </div>
            <div className="user-info">
                <h2>{userData.name}</h2>
                <Link to="/edit-profile" className="edit-profile-button">
                    Editar Perfil
                </Link>
            </div>
        </div>
    );
};

export default ProfileComponent;
