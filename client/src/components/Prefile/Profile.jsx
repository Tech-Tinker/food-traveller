import React, { useState } from 'react';

function Profile() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleBirthdateChange = (event) => {
        setBirthdate(event.target.value);
    };

    const handlePhotoChange = (event) => {
        setPhoto(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Enviar los datos al servidor para actualizar el perfil del usuario
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('birthdate', birthdate);
        formData.append('photo', photo);

        fetch('/api/update-profile', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>
            <br />
            <label>
                Descripción:
                <textarea value={description} onChange={handleDescriptionChange} />
            </label>
            <br />
            <label>
                Fecha de nacimiento:
                <input type="date" value={birthdate} onChange={handleBirthdateChange} />
            </label>
            <br />
            <label>
                Foto:
                <input type="file" accept="image/*" onChange={handlePhotoChange} />
                {photo && <img src={URL.createObjectURL(photo)} alt="Vista previa de la foto" />}
            </label>
            <br />
            <button type="submit">Guardar cambios</button>
        </form>
    );
}

export default Profile;
