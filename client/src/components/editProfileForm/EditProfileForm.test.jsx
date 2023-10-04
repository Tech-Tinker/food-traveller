import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditProfileForm from './EditProfileForm';

describe('EditProfileForm', () => {
  it('should render all form fields', () => {
    const { getByLabelText, getByText } = render(<EditProfileForm />);
    expect(getByLabelText('Nombre completo')).toBeInTheDocument();
    expect(getByLabelText('Correo electrónico')).toBeInTheDocument();
    expect(getByLabelText('País')).toBeInTheDocument();
    expect(getByText('Me interesa la comida...')).toBeInTheDocument();
    expect(getByText('En la cocina me considero...')).toBeInTheDocument();
    expect(getByText('Cancelar')).toBeInTheDocument();
    expect(getByText('Añadir')).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    const { getByLabelText } = render(<EditProfileForm />);
    const nameInput = getByLabelText('Nombre completo');
    const emailInput = getByLabelText('Correo electrónico');
    const countryInput = getByLabelText('País');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(countryInput, { target: { value: 'Estados Unidos' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('johndoe@example.com');
    expect(countryInput.value).toBe('Estados Unidos');
  });

  it('should update interests when user clicks on them', () => {
    const { getByText } = render(<EditProfileForm />);
    const foodInterestButton = getByText('Comida italiana');

    fireEvent.click(foodInterestButton);

    expect(foodInterestButton).toHaveClass('selected');
  });

  it('should call handleSaveChanges when user clicks on Añadir button', () => {
    const handleSaveChanges = jest.fn();
    const { getByText } = render(<EditProfileForm handleSaveChanges={handleSaveChanges} />);
    const addButton = getByText('Añadir');

    fireEvent.click(addButton);

    expect(handleSaveChanges).toHaveBeenCalled();
  });

  it('should call handleCancel when user clicks on Cancelar button', () => {
    const handleCancel = jest.fn();
    const { getByText } = render(<EditProfileForm handleCancel={handleCancel} />);
    const cancelButton = getByText('Cancelar');

    fireEvent.click(cancelButton);

    expect(handleCancel).toHaveBeenCalled();
  });
});