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
        culinaryExperience: user.culinaryExperience,
    });

    const handleInput = (e) => {
        e.persist();
        setProfileInput({ ...profileInput, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: profileInput.name,
            description: profileInput.description,
            birthdate: profileInput.birthdate,
            country: profileInput.country,
            culinaryExperience: profileInput.culinaryExperience,
        };

        // Make an API request to update the user profile with formData
        // You need to implement this API endpoint on your server.
        axios.post('http://localhost:8000/api/update-profile', formData)
            .then(res => {
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    // Redirect to the user's profile page after successful update.
                    navigate(`/profile/${user.id}`);
                } else {
                    // Handle validation errors here if any.
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
