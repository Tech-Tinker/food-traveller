import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('should render the login form', () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Contraseña')).toBeInTheDocument();
    expect(getByText('Iniciar sesión')).toBeInTheDocument();
    expect(getByText('No tienes cuenta?')).toBeInTheDocument();
  });

  it('should update the email field when typing', () => {
    const { getByLabelText } = render(<LoginForm />);
    const emailInput = getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should update the password field when typing', () => {
    const { getByLabelText } = render(<LoginForm />);
    const passwordInput = getByLabelText('Contraseña');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  it('should submit the form with valid credentials', async () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Iniciar sesión');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('auth_token')).not.toBeNull();
      expect(localStorage.getItem('auth_name')).not.toBeNull();
      expect(localStorage.getItem('auth_user_id')).not.toBeNull();
    });
  });

  it('should show an error message with invalid credentials', async () => {
    const { getByLabelText, getByText } = render(<LoginForm />);
    const emailInput = getByLabelText('Email');
    const passwordInput = getByLabelText('Contraseña');
    const submitButton = getByText('Iniciar sesión');

    fireEvent.change(emailInput, { target: { value: 'invalid@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidpassword' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('auth_token')).toBeNull();
      expect(localStorage.getItem('auth_name')).toBeNull();
      expect(localStorage.getItem('auth_user_id')).toBeNull();
      expect(getByText('Credenciales inválidas')).toBeInTheDocument();
    });
  });
});