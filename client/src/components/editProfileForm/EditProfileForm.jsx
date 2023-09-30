import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { updateProfile, getUserById } from '../../services/ApiServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './EditProfileForm.css';

const EditProfileForm = () => {
    const navigate = useNavigate();

    const [user_name, setUser_name] = useState('');
    const [profile_image, setProfile_image] = useState('');
    const [description, setDescription] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [country, setCountry] = useState('');
    const [interests, setInterests] = useState('');
    const [culinary_experience, setCulinary_experience] = useState('');

    const handleAvatarChange = (e) => {
        const selectedAvatar = e.target.files[0];
        setProfile_image(selectedAvatar);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                user_name,
                profile_image,
                description,
                birthdate,
                country,
                interests,
                culinary_experience,
            };

            const response = await updateProfile(data);
            if (response.errors) {
                console.log('Errors:', response.errors);
            } else {
                swal('Success', response.message, 'success');
                navigate(`/`);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserById();
                setUser_name(data.profile.user_name);
                setProfile_image(data.profile.profile_image);
                setDescription(data.profile.description);
                setBirthdate(data.profile.birthdate);
                setCountry(data.profile.country);
                setInterests(data.profile.interests);
                setCulinary_experience(data.profile.culinary_experience);
            } catch (error) {
                console.error('Error fetching profile :', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            <form onSubmit={handleSubmit} className="edit-profile-form rounded-1">
                <h2 className="text-center bold mb-3" style={{ color: '#2F93A9' }}>
                    Editar Perfil
                </h2>

                <div className="mb-3 text-center">
                    <label htmlFor="avatar" className="text-blue-500 font-semibold avatartext">
                        Cambiar foto del perfil
                    </label>
                    <div className="avatar-upload mx-auto">
                        <label className="avatar-icon">
                            {profile_image ? (
                                <img className="profil-img"
                                    src={URL.createObjectURL(profile_image)}
                                    alt="Avatar"
                                />
                            ) : (
                                <FontAwesomeIcon icon={faPlus} />
                            )}
                            <input
                                type="file"
                                name="profile_image"
                                id="avatar"
                                className="avatar-input"
                                accept="image/*"
                                onChange={handleAvatarChange}
                            />
                        </label>
                    </div>
                </div>


                <div className="mb-3">
                    <label htmlFor="user_name" className="text-black bold">
                        Nombre
                    </label>
                    <input
                        onChange={(e) => setUser_name(e.target.value)}
                        value={user_name}
                        type="text"
                        name="user_name"
                        className="border-1px-solid-gray text-left w-100 p-2 rounded-2"
                        placeholder="Nombre"
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="description" className="text-black bold">Descripción</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        className="border-1px-solid-gray text-left w-100 p-2 rounded-2"
                        placeholder="Descripción"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="birthdate" className="text-black bold">Fecha de Nacimiento</label>
                    <br />
                    <input
                        onChange={(e) => setBirthdate(e.target.value)}
                        value={birthdate}
                        type="date"
                        name="birthdate"
                        className="border-1px-solid-gray text-left w-100 p-2 rounded-2"
                        style={{ borderColor: "#B4B4B4" }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="country" className="text-black bold">País de Origen</label>
                    <br />
                    <select
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        name="country"
                        className="border-1px-solid-gray w-100 p-2 rounded-2"
                        style={{ borderColor: "#B4B4B4" }}
                    >
                        <option value="">Selecciona un país</option>
                        <option value="europa">Europa</option>
                        <option value="america">América del Norte</option>
                        <option value="americas">América del Sur</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="interests" className="text-black bold">Intereses</label>
                    <input
                        onChange={(e) => setInterests(e.target.value)}
                        value={interests}
                        type="text"
                        name="interests"
                        className="border-1px-solid-gray text-left w-100 p-2 rounded-2"
                    />
                </div>

                <div className="d-flex justify-content-between">
                    <Button backgroundColorClass="bttn-primary" id="cancelButton" text="Cancelar" />
                    <Button backgroundColorClass="bttn-secondary" id="aceptButton" text="Añadir" />
                </div>
            </form>
        </div>

    );

}

export default EditProfileForm;

