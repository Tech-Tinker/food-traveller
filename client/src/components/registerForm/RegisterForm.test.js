import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';

describe('RegisterForm', () => {
  it('should render the form with input fields and a submit button', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterForm />);
    expect(getByPlaceholderText('Nombre')).toBeInTheDocument();
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(getByText('Regístrate')).toBeInTheDocument();
  });

  it('should show error messages when form is submitted with invalid inputs', async () => {
    const { getByPlaceholderText, getByText } = render(<RegisterForm />);
    const nameInput = getByPlaceholderText('Nombre');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Contraseña');
    const submitButton = getByText('Regístrate');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('El campo nombre es obligatorio')).toBeInTheDocument();
      expect(getByText('El campo email debe ser una dirección de correo electrónico válida.')).toBeInTheDocument();
      expect(getByText('El campo contraseña es obligatorio')).toBeInTheDocument();
    });
  });

  it('should submit the form when all inputs are valid and the user accepts the terms and conditions', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(<RegisterForm />);
    const nameInput = getByPlaceholderText('Nombre');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Contraseña');
    const submitButton = getByText('Regístrate');
    const termsCheckbox = getByLabelText('Acepto los términos y condiciones de la política de protección de datos. Recibirás confirmación del registro por correo electrónico.');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('auth_token')).not.toBeNull();
      expect(localStorage.getItem('auth_name')).toBe('John Doe');
      expect(localStorage.getItem('auth_user_id')).not.toBeNull();
      expect(getByText('Success')).toBeInTheDocument();
      expect(getByText('Te damos la bienvenida a bordo!')).toBeInTheDocument();
    });
  });
});