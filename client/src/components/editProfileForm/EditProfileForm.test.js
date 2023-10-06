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
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(countryInput, { target: { value: 'Estados Unidos' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(countryInput.value).toBe('Estados Unidos');
  });

  it('should update interests when user clicks on them', () => {
    const { getByText } = render(<EditProfileForm />);
    const foodInterestButton = getByText('Comida');
    const drinkInterestButton = getByText('Bebida');

    fireEvent.click(foodInterestButton);
    fireEvent.click(drinkInterestButton);

    expect(foodInterestButton).toHaveClass('selected');
    expect(drinkInterestButton).toHaveClass('selected');
  });

  it('should update culinary experience when user selects from dropdown', () => {
    const { getByLabelText } = render(<EditProfileForm />);
    const culinaryExperienceSelect = getByLabelText('En la cocina me considero...');

    fireEvent.change(culinaryExperienceSelect, { target: { value: 'Experto sibarita' } });

    expect(culinaryExperienceSelect.value).toBe('Experto sibarita');
  });
});