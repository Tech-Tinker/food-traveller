
import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react';
import Button from './Button';

test('El botón muestra el texto y la clase de fondo correctos', () => {
    // Renderiza el componente con las propiedades necesarias
    const { getByText, container } = render(
        <button text="Haz clic en mí" backgroundColorClass="bg-blue" />
    );

});