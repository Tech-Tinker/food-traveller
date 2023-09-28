import React, { useEffect, useState } from 'react'
// import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { updateProfile, getUserById } from '../../services/ApiServices';


const EditProfileForm = () => {
    const navigate = useNavigate();

    const [user_name, setUser_name] = useState('')
    const [profile_image, setProfile_image] = useState('')
    const [description, setDescription] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [country, setCountry] = useState('')
    const [interests, setInterests] = useState('')
    const [culinary_experience, setCulinary_experience] = useState('')

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
            // console.log(response);
            if (response.errors) {
                console.log('Errors:', response.errors);
            } else {
                swal("Success", response.message, "success");
                navigate(`/`);
            }
        } catch (error) {
            console.error('Error updating recipe:', error);
            // const errors = error.response.data.errors
            // setErrors({ title: errors.title && errors.title[0], description: errors.description && errors.description[0], time: errors.time && errors.time[0], category: errors.category && errors.category[0], difficulty: errors.difficulty && errors.difficulty[0], ingredients: errors.ingredients && errors.ingredients[0], preparation: errors.preparation && errors.preparation[0], country: errors.country && errors.country[0], image: errors.image && errors.image[0], });
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUserById();
                console.log(data.profile);
                // console.log(data.recipe.user_id, userId, data.recipe.user_id !== userId)
                // if (data.profile.user_id !== userId) {
                //     navigate('/')
                //     return
                // }
                setUser_name(data.profile.user_name)
                setProfile_image(data.profile.profile_image)
                setDescription(data.profile.description)
                setBirthdate(data.profile.birthdate)
                setCountry(data.profile.country)
                setInterests(data.profile.interests)
                setCulinary_experience(data.profile.culinary_experience)
            } catch (error) {
                console.error('Error fetching profile :', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="d-flex justify-content-center">
            <form onSubmit={handleSubmit} className="edit-profile-form rounded-0">
                <h2 className="text-center bold mb-3">Editar Perfil</h2>

                <div className="mb-3 text-center">
                    <input
                        onChange={(e) => setUser_name(e.target.value)}
                        value={user_name}
                        type="text"
                        name="user_name"
                        className="text-left border-0 border-bottom border border-dark"
                        placeholder="Nombre"
                    />
                </div>

                {/* Agregar campo para seleccionar una nueva imagen de avatar */}
                <div className="mb-3 text-center">
                    <label htmlFor="avatar" className="text-black bold">Cambiar Avatar</label>
                    <input
                        onChange={(e) => setProfile_image(e.target.value)}
                        value={profile_image}
                        type="text"
                        name="profile_image"
                        // accept="image/*"
                        className="border-0 border-bottom text-left"
                    />
                </div>

                <div className="mb-3 text-center">
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="description"
                        className="text-left border-0 border-bottom border border-dark"
                        placeholder="Descripción"
                    />
                </div>

                <div className="mb-3 text-center">
                    <label htmlFor="birthdate" className="text-black bold">Fecha de Nacimiento</label>
                    <br />
                    <input
                        onChange={(e) => setBirthdate(e.target.value)}
                        value={birthdate}
                        type="text"
                        name="birthdate"
                        className="border-0 border-bottom text-left"
                    />
                </div>

                <div className="mb-3 text-center">
                    <label htmlFor="country" className="text-black bold">País de Origen</label>
                    <br />
                    <select
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
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
                    <label htmlFor="interests" className="text-black bold">Intereses</label>
                    <br />
                    <input
                        onChange={(e) => setInterests(e.target.value)}
                        value={interests}
                        type="text"
                        name="interests"
                        className="border-0 border-bottom text-left"
                    />
                </div>

                <div className="mb-3 text-center">
                    <label htmlFor="culinary_experience" className="text-black bold"> En la cocina me considero...</label>
                    <br />
                    <select
                        onChange={(e) => setCulinary_experience(e.target.value)}
                        value={culinary_experience}
                        name="culinary_experience"
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
