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

  it('should render the "Editar Perfil" and "Cerrar Sesión" links when the current page is "/profile"', () => {
    render(
      <MemoryRouter initialEntries={['/profile']}>
        <MenuBurguer currentPage="/profile" />
      </MemoryRouter>
    );

    const editarPerfilLink = screen.getByText('Editar Perfil');
    expect(editarPerfilLink).toBeInTheDocument();

    const cerrarSesionLink = screen.getByText('Cerrar Sesión');
    expect(cerrarSesionLink).toBeInTheDocument();
  });

  it('should render the "Mi Perfil" and "Cerrar Sesión" links when the current page is "/create-recipe"', () => {
    render(
      <MemoryRouter initialEntries={['/create-recipe']}>
        <MenuBurguer currentPage="/create-recipe" />
      </MemoryRouter>
    );

    const miPerfilLink = screen.getByText('Mi Perfil');
    expect(miPerfilLink).toBeInTheDocument();

    const cerrarSesionLink = screen.getByText('Cerrar Sesión');
    expect(cerrarSesionLink).toBeInTheDocument();
  });

  it('should render the "Mi Perfil" and "Cerrar Sesión" links when the current page is "/edit-recipe/:id"', () => {
    render(
      <MemoryRouter initialEntries={['/edit-recipe/1']}>
        <Route path="/edit-recipe/:id">
          <MenuBurguer currentPage={`/edit-recipe/1`} />
        </Route>
      </MemoryRouter>
    );

    const miPerfilLink = screen.getByText('Mi Perfil');
    expect(miPerfilLink).toBeInTheDocument();

    const cerrarSesionLink = screen.getByText('Cerrar Sesión');
    expect(cerrarSesionLink).toBeInTheDocument();
  });
});