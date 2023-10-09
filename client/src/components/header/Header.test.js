import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('Header', () => {
  it('renders logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo Foodtravel');
    expect(logo).toBeInTheDocument();
  });

  it('renders login button when not logged in', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    const loginButton = screen.getByAltText('Icono de Login');
    expect(loginButton).toBeInTheDocument();
  });

  it('renders profile and logout buttons when logged in', () => {
    localStorage.setItem('auth_token', 'fake_token');
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );
    const profileButton = screen.getByText('Mi Perfil');
    const logoutButton = screen.getByText('Cerrar Sesión');
    expect(profileButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    localStorage.removeItem('auth_token');
  });

  it('logs out when logout button is clicked', () => {
    localStorage.setItem('auth_token', 'fake_token');
    const handleLogoutMock = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header handleLogout={handleLogoutMock} />
      </MemoryRouter>
    );
    const logoutButton = screen.getByText('Cerrar Sesión');
    fireEvent.click(logoutButton);
    expect(handleLogoutMock).toHaveBeenCalled();
    localStorage.removeItem('auth_token');
  });

  it('navigates to home when logo is clicked', () => {
    const homeEventMock = jest.fn();
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <Header homeEvent={homeEventMock} />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo Foodtravel');
    fireEvent.click(logo);
    expect(homeEventMock).toHaveBeenCalled();
  });
});