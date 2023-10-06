import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header component', () => {
  test('renders logo', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const logoElement = screen.getByAltText('Logo Foodtraveller');
    expect(logoElement).toBeInTheDocument();
  });

  test('renders login button when not logged in and on home page', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const loginButton = screen.getByAltText('Icono de Login');
    expect(loginButton).toBeInTheDocument();
  });

  test('does not render login button when logged in and on home page', () => {
    localStorage.setItem('auth_token', 'fake_token');
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const loginButton = screen.queryByAltText('Icono de Login');
    expect(loginButton).not.toBeInTheDocument();
    localStorage.removeItem('auth_token');
  });

  test('renders menu burger when logged in and on allowed pages', () => {
    localStorage.setItem('auth_token', 'fake_token');
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const menuBurger = screen.getByTestId('menu-burger');
    expect(menuBurger).toBeInTheDocument();
    localStorage.removeItem('auth_token');
  });

  test('does not render menu burger when not logged in', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const menuBurger = screen.queryByTestId('menu-burger');
    expect(menuBurger).not.toBeInTheDocument();
  });

  test('does not render menu burger when logged in and on disallowed pages', () => {
    localStorage.setItem('auth_token', 'fake_token');
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const menuBurger = screen.queryByTestId('menu-burger');
    expect(menuBurger).not.toBeInTheDocument();
    localStorage.removeItem('auth_token');
  });
});