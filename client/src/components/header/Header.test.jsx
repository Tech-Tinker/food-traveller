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

  test('renders avatar when not logged in and on home page', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const avatarElement = screen.getByAltText('Icono de Login');
    expect(avatarElement).toBeInTheDocument();
  });

  test('does not render avatar when logged in', () => {
    localStorage.setItem('auth_token', 'fake_token');
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const avatarElement = screen.queryByAltText('Icono de Login');
    expect(avatarElement).not.toBeInTheDocument();
    localStorage.removeItem('auth_token');
  });

  test('renders menu burger when logged in and on allowed pages', () => {
    localStorage.setItem('auth_token', 'fake_token');
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const menuBurgerElement = screen.getByTestId('menu-burger');
    expect(menuBurgerElement).toBeInTheDocument();
    localStorage.removeItem('auth_token');
  });

  test('does not render menu burger when not logged in', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const menuBurgerElement = screen.queryByTestId('menu-burger');
    expect(menuBurgerElement).not.toBeInTheDocument();
  });
});