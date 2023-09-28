import React, { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const EditProfileForm = ({ user }) => {
    const navigate = useNavigate();

    const [profileInput, setProfileInput] = useState({
        name: user.name,
        description: user.description,
        birthdate: user.birthdate,
        country: user.country,
        interests: user.interests,
        culinaryExperience: user.culinaryExperience,
        avatar: null, // Nuevo campo para la imagen de avatar
    });

    const handleInput = (e) => {
        e.persist();
        setProfileInput({ ...profileInput, [e.target.name]: e.target.value });
    }

    // Manejar la selección de una nueva imagen de avatar
    const handleAvatarChange = (e) => {
        const selectedAvatar = e.target.files[0];
        setProfileInput({ ...profileInput, avatar: selectedAvatar });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", profileInput.name);
        formData.append("description", profileInput.description);
        formData.append("birthdate", profileInput.birthdate);
        formData.append("country", profileInput.country);
        formData.append("interests", profileInput.interests);
        formData.append("culinaryExperience", profileInput.culinaryExperience);
        
        // Agregar la nueva imagen de avatar al formData si se selecciona
        if (profileInput.avatar) {
            formData.append("avatar", profileInput.avatar);
        }

        // Realizar una solicitud POST para actualizar el perfil del usuario
        axios.post('http://localhost:8000/api/edit-profile', formData)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Éxito", res.data.message, "success");
                    // Redirigir al usuario a su página de perfil después de una actualización exitosa.
                    navigate(`/profile/${user.id}`);
                } else {
                    
                }
            });
    }

    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="edit-profile-form rounded-0">
                <h2 className="text-center bold mb-3">Editar Perfil</h2>

                <div className="mb-3 text-center">
                    <input
                        onChange={handleInput}
                        value={profileInput.name}
                        type="text"
                        name="name"
                        className="text-left border-0 border-bottom border border-dark"
                        placeholder="Nombre"
                    />
                </div>

                {/* Agregar campo para seleccionar una nueva imagen de avatar */}
                <div className="mb-3 text-center">
                    <label htmlFor="avatar" className="text-black bold">Cambiar Avatar</label>
                    <input
                        onChange={handleAvatarChange}
                        type="file"
                        name="avatar"
                        accept="image/*"
                        className="border-0 border-bottom text-left"
                    />
                </div>

                <div className="mb-3 text-center">
                    <textarea
                        onChange={handleInput}
                        value={profileInput.description}
                        name="description"
                        className="text-left border-0 border-bottom border border-dark"
                        placeholder="Descripción"
                    />
                </div>

                <div className="mb-3 text-center">
                    <label htmlFor="birthdate" className="text-black bold">Fecha de Nacimiento</label>
                    <br />
                    <input
                        onChange={handleInput}
                        value={profileInput.birthdate}
                        type="date"
                        name="birthdate"
                        className="border-0 border-bottom text-left"
                    />
                </div>

                <div className="mb-3 text-center">
                    <label htmlFor="country" className="text-black bold">País de Origen</label>
                    <br />
                    <select
                        onChange={handleInput}
                        value={profileInput.country}
                        name="country"
                        className="border-0 border-bottom"
                    >
                        <option value="">Selecciona un país</option>
                        <option value="europa">Europa</option>
                        <option value="america">América del Norte</option>
                        <option value="americas">América del Sur</option>
                    </select>
                </div>

                <div className="mb-3 text-center">
                    <label className="text-black bold"> En la cocina me considero...</label>
                    <br />
                    <select
                        onChange={handleInput}
                        value={profileInput.culinaryExperience}
                        name="culinaryExperience"
                        className="border-0 border-bottom"
                    >
                        <option value="1">Experto sibarita</option>
                        <option value="2">Experto tradicional</option>
                        <option value="3">Intermedio</option>
                        <option value="4">Principiante</option>
                    </select>
                </div>

                <div className="d-flex justify-content-evenly">
                    <Button backgroundColorClass="bttn-primary" id="aceptButton" text="Guardar Cambios" />
                    <Button backgroundColorClass="bttn-secondary" id="cancelButton" text="Cancelar" />
                </div>
            </form>
        </div>
    )
}

export default EditProfileForm;
