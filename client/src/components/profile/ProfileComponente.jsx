import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileComponent.css';
import axios from 'axios';
import Avatar from '../../assets/Avatar.svg';

const ProfileComponent = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        axios.get('/api/profile') 
            .then((response) => {
                setUserData(response.data.user);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del usuario:', error);
            });
    }, []);

    
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
