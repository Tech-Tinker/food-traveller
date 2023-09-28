import React from 'react';
import Select from 'react-select';
import '../dropdown/Dropdown.css';

const Dropdown = () => {

    const options = [
        { label: 'Entrante', value: 'starter' },
        { label: 'Primero', value: 'first' },
        { label: 'Segundo', value: 'second' },
        { label: 'Postre', value: 'desert' }
    ]

    return (
        <div className="select-container">
            <Select
                defaultValue={{ label: 'Selecciona', value: 'Select' }}
                options={options}
            />
        </div>
    )
}

export default Dropdown
