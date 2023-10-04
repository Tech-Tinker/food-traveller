import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MenuBurguer from './MenuBurguer';

describe('MenuBurguer', () => {
  it('should render the menu icon', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    const menuIcon = screen.getByAltText('Menu');
    expect(menuIcon).toBeInTheDocument();
  });

  it('should toggle the menu when the menu icon is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    const menuIcon = screen.getByAltText('Menu');
    fireEvent.click(menuIcon);

    const menuList = screen.getByRole('list');
    expect(menuList).toBeInTheDocument();

    fireEvent.click(menuIcon);
    expect(menuList).not.toBeInTheDocument();
  });

  it('should render the "Mi Perfil" link when the current page is "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    const miPerfilLink = screen.getByText('Mi Perfil');
    expect(miPerfilLink).toBeInTheDocument();
  });

  it('should render the "Editar Perfil" link when the current page is "/profile"', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <MenuBurguer currentPage="/profile" />
      </MemoryRouter>
    );

    const editarPerfilLink = screen.getByText('Editar Perfil');
    expect(editarPerfilLink).toBeInTheDocument();
  });

  it('should render the "Cerrar Sesión" link when the current page is "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    const cerrarSesionLink = screen.getByText('Cerrar Sesión');
    expect(cerrarSesionLink).toBeInTheDocument();
  });

  it('should render the "Cerrar Sesión" link when the current page is "/profile"', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <MenuBurguer currentPage="/profile" />
      </MemoryRouter>
    );

    const cerrarSesionLink = screen.getByText('Cerrar Sesión');
    expect(cerrarSesionLink).toBeInTheDocument();
  });

  it('should navigate to "/edit-profile" when the "Editar Perfil" link is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/profile']}>
        <Route path="/edit-profile">
          <div data-testid="edit-profile-page" />
        </Route>
        <MenuBurguer currentPage="/profile" />
      </MemoryRouter>
    );

    const editarPerfilLink = screen.getByText('Editar Perfil');
    fireEvent.click(editarPerfilLink);

    const editProfilePage = container.querySelector('[data-testid="edit-profile-page"]');
    expect(editProfilePage).toBeInTheDocument();
  });

  it('should navigate to "/" when the "Mi Perfil" link is clicked', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/profile']}>
        <Route path="/">
          <div data-testid="home-page" />
        </Route>
        <MenuBurguer currentPage="/profile" />
      </MemoryRouter>
    );

    const miPerfilLink = screen.getByText('Mi Perfil');
    fireEvent.click(miPerfilLink);

    const homePage = container.querySelector('[data-testid="home-page"]');
    expect(homePage).toBeInTheDocument();
  });
});