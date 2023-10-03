import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Header from './Header';

function renderHeaderWithRouter() {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}

describe('Header component', () => {
  afterEach(() => {
    localStorage.removeItem('auth_token');
  });

  test('should render logo', () => {
    renderHeaderWithRouter();
    const logoElement = screen.getByAltText('Logo Foodtraveller');
    expect(logoElement).toBeInTheDocument();
  });

  test('should render avatar when not logged in and on home page', () => {
    renderHeaderWithRouter();
    const avatarElement = screen.getByAltText('Icono de Login');
    expect(avatarElement).toBeInTheDocument();
  });

  test('should not render avatar when logged in', () => {
    localStorage.setItem('auth_token', 'fake_token');
    renderHeaderWithRouter();
    const avatarElement = screen.queryByAltText('Icono de Login');
    expect(avatarElement).not.toBeInTheDocument();
  });

  // test('should render menu burger when logged in and on allowed pages', () => {
  //   localStorage.setItem('auth_token', 'fake_token');
  //   renderHeaderWithRouter();
  //   const menuBurgerElement = screen.queryByAltText('menu-burger');
  //   expect(menuBurgerElement).toBeInTheDocument();
  // });

  // test('should not render menu burger when not logged in', () => {
  //   renderHeaderWithRouter();
  //   const menuBurgerElement = screen.queryByAltText('menu-burger');
  //   expect(menuBurgerElement).not.toBeInTheDocument();
  // });
});
