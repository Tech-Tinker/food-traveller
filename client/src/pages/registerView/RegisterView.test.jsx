import React from 'react';
import { render, screen } from '@testing-library/react';
import RegisterView from './RegisterView';

describe('RegisterView', () => {
  test('renders header and register form', () => {
    render(<RegisterView />);
    const headerElement = screen.getByTestId('header');
    const registerFormElement = screen.getByTestId('register-form');
    expect(headerElement).toBeInTheDocument();
    expect(registerFormElement).toBeInTheDocument();
  });
});