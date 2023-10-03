import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { updateProfile, getUserById } from '../../services/ApiServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faPlus } from '@fortawesome/free-solid-svg-icons';
import './EditProfileForm.css';

const EditProfileForm = () => {
    const navigate = useNavigate();

    const [user_name, setUser_name] = useState('');
    const [profile_image, setProfile_image] = useState(null);
    const [newProfileImage, setNewProfileImage] = useState(null);
    const [description, setDescription] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [country, setCountry] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [culinary_experience, setCulinary_experience] = useState('');

    const interests = [
        "Saludable",
        "Rápida",
        "Creativa",
        "Picante",
        "Especiada",
        "Asiática",
        "Vegana",
        "Vegetariana",
        "Tradicional",
        "Mediterránea",
    ];

    const handleAvatarChange = (e) => {
        const selectedAvatar = e.target.files[0];
        setNewProfileImage(selectedAvatar);
    };

    const handleClearImage = () => {
        setNewProfileImage(null);
    };

    const handleInterestClick = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(selectedInterests.filter((item) => item !== interest));
        } else {
            setSelectedInterests([...selectedInterests, interest]);
        }
    };

    const isInterestSelected = (interest) => {
        return selectedInterests.includes(interest);
    };

    const handleCancel = () => {
        // Redirige al usuario a la página de perfil sin realizar ningún cambio.
        navigate(`/perfil`);
    };

    const handleSaveChanges = async () => {
        try {
            const data = {
                user_name,
                profile_image: newProfileImage || profile_image,
                description,
                birthdate,
                country,
                interests: selectedInterests,
                culinary_experience,
            };

            const response = await updateProfile(data);
            if (response.errors) {
                console.log('Errors:', response.errors);
            } else {
                // Muestra un mensaje de éxito y redirige al usuario a la página de perfil.
                swal('Success', response.message, 'success');
                navigate(`/profile`);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
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
                setSelectedInterests(data.profile.interests || []);
                setCulinary_experience(data.profile.culinary_experience);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchData();
    }, []);

     return (
        <div className="d-flex flex-column align-items-center mt-5">
            <form className="edit-profile-form rounded-1" style={{ margin: '20px' }}>
                <h2 className="text-center bold mb-3" style={{ color: '#2F93A9' }}>
                    Editar Perfil
                </h2>

                <div className="mb-3 text-center">
                    <label htmlFor="avatar" className="text-blue-500 font-semibold avatartext">
                        Cambiar foto del perfil
                    </label>
                    <div
                        className="avatar-upload mx-auto"
                        style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            border: '2px solid #00963F',
                            overflow: 'hidden',
                        }}
                    >
                        <input
                            type="file"
                            name="profile_image"
                            id="avatar"
                            className="avatar-input"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            style={{
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                position: 'absolute',
                            }}
                        />
                        {newProfileImage ? (
                            <div
                                className="selected-image-container"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(newProfileImage)}
                                    alt="Avatar"
                                    className="selected-image"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        borderRadius: '50%',
                                    }}
                                />
                                <button
                                    className="clear-image-button"
                                    onClick={handleClearImage}
                                    style={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        background: 'none',
                                        border: 'none',
                                        color: '#BB9B8E',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={faCamera}
                                        style={{
                                            fontSize: '20px',
                                            backgroundColor: 'white',
                                            borderRadius: '50%',
                                            padding: '3px',
                                            border: '3px solid white',
                                        }}
                                    />
                                </button>
                            </div>
                        ) : profile_image ? (
                            <div
                                className="selected-image-container"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(profile_image)}
                                    alt="Avatar"
                                    className="selected-image"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>
                        ) : (
                            <label
                                htmlFor="avatar"
                                className="avatar-icon mx-auto"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <FontAwesomeIcon icon={faPlus} style={{ fontSize: '36px' }} />
                            </label>
                        )}
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
                        <option value="Alemania">Alemania</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Australia">Australia</option>
                        <option value="Austria">Austria</option>
                        <option value="Bélgica">Bélgica</option>
                        <option value="Bolivia">Bolivia</option>
                        <option value="Brasil">Brasil</option>
                        <option value="Canadá">Canadá</option>
                        <option value="Chile">Chile</option>
                        <option value="China">China</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Corea del Sur">Corea del Sur</option>
                        <option value="Costa de Marfil">Costa de Marfil</option>
                        <option value="Costa Rica">Costa Rica</option>
                        <option value="Cuba">Cuba</option>
                        <option value="Ecuador">Ecuador</option>
                        <option value="Egipto">Egipto</option>
                        <option value="El Salvador">El Salvador</option>
                        <option value="aEspaña">España</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="Francia">Francia</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Guatemala">Guatemala</option>
                        <option value="Honduras">Honduras</option>
                        <option value="Idia">India</option>
                        <option value="Idonesia">Indonesia</option>
                        <option value="Italia">Italia</option>
                        <option value="Japón">Japón</option>
                        <option value="Kenia">Kenia</option>
                        <option value="Malasia">Malasia</option>
                        <option value="Marruecos">Marruecos</option>
                        <option value="México">México</option>
                        <option value="aNicaragua">Nicaragua</option>
                        <option value="aNigeria">Nigeria</option>
                        <option value="Nueva Zelanda">Nueva Zelanda</option>
                        <option value="Países Bajos">Países Bajos</option>
                        <option value="Panamá">Panamá</option>
                        <option value="Paraguay">Paraguay</option>
                        <option value="Perú">Perú</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Puerto Ricpo">Puerto Rico</option>
                        <option value="Reino Unido">Reino Unido</option>
                        <option value="República Dominicana">República Dominicana</option>
                        <option value="Suiza">Suiza</option>
                        <option value="Tailandia">Tailandia</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Uruguay">Uruguay</option>
                        <option value="Venezuela">Venezuela</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="Uganda">Uganda</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="interests" className="text-black bold">Me interesa la comida...</label>
                    <br />
                    <div className="interests-container">
                        {interests.map((interest) => (
                            <button 
                                key={interest}
                                type="button"
                                className={`interest-button ${isInterestSelected(interest) ? 'selected' : ''
                                    }`}
                                onClick={() => handleInterestClick(interest)}
                                style={{
                                    backgroundColor: isInterestSelected(interest) ? '#3093A9' : 'white',
                                    color: isInterestSelected(interest) ? 'white' : 'black',
                                    border: '1px solid gray',
                                    borderRadius: '5px',
                                    width: '108px',
                                    height: '31px',
                                    margin: '5px',
                                }}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="cooking_experience" className="text-black bold">En la cocina me considero...</label>
                    <br />
                    <select
                        onChange={(e) => setCulinary_experience(e.target.value)}
                        value={culinary_experience}
                        name="cooking_experience"
                        className="border-1px-solid-gray w-100 p-2 rounded-2"
                        style={{ borderColor: "#B4B4B4" }}
                    >
                        <option value="Experto sibarita">Experto sibarita</option>
                        <option value="Experto tradicional">Experto tradicional</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Principiante">Principiante</option>
                    </select>
                </div>

                <div className="d-flex justify-content-between">
                    <Button backgroundColorClass="bttn-primary" id="cancelButton" text="Cancelar" onClick={handleCancel} />
                    <Button backgroundColorClass="bttn-secondary" id="aceptButton" text="Añadir" onClick={handleSaveChanges} />
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;

