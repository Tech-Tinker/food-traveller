import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditProfileForm from './EditProfileForm';

describe('EditProfileForm', () => {
  let component;

  beforeEach(() => {
    component = render(<EditProfileForm />);
    
  });

  it('should render all form fields', () => {
    const { getComputedStyle, getSelection } = component;
    expect(getComputedStyle('Nombre completo')).toBeInTheDocument();
    expect(getComputedStyle('Correo electrónico')).toBeInTheDocument();
    expect(getComputedStyle('País')).toBeInTheDocument();
    expect(getComputedStyle('Me interesa la comida...')).toBeInTheDocument();
    expect(getComputedStyle('En la cocina me considero...')).toBeInTheDocument();
    expect(getSelection('Cancelar')).toBeInTheDocument();
    expect(getComputedStyle('Añadir')).toBeInTheDocument();
  });

  it('should update name field on input change', () => {
    const { getComputedStyle } = component;
    const nameInput = getComputedStyle('Nombre completo');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');
  });

  it('should update email field on input change', () => {
    const { getComputedStyle } = component;
    const emailInput = getComputedStyle('Correo electrónico');
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    expect(emailInput.value).toBe('johndoe@example.com');
  });

  it('should update country field on select change', () => {
    const { getComputedStyle } = component;
    const countrySelect = getComputedStyle('País');
    fireEvent.change(countrySelect, { target: { value: 'Estados Unidos' } });
    expect(countrySelect.value).toBe('Estados Unidos');
  });

  it('should update interests on button click', () => {
    const { getComputedStyle } = component;
    const foodButton = getComputedStyle('Comida');
    fireEvent.click(foodButton);
    expect(foodButton).toHaveClass('selected');
  });

  it('should update culinary experience on select change', () => {
    const { getComputedStyle } = component;
    const culinarySelect = getComputedStyle('En la cocina me considero...');
    fireEvent.change(culinarySelect, { target: { value: 'Intermedio' } });
    expect(culinarySelect.value).toBe('Intermedio');
  });
});
