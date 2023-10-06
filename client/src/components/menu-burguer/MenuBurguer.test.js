import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MenuBurguer from './MenuBurguer';

describe('MenuBurguer', () => {
  it('should render the component', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    expect(getByAltText('Menu')).toBeInTheDocument();
  });

  it('should show the menu when the icon is clicked', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText('Menu'));

    expect(getByText('Mi Perfil')).toBeInTheDocument();
    expect(getByText('Cerrar Sesión')).toBeInTheDocument();
  });

  it('should hide the menu when the close icon is clicked', () => {
    const { getByAltText, queryByText } = render(
      <MemoryRouter>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText('Menu'));
    fireEvent.click(getByAltText('Cruz'));

    expect(queryByText('Mi Perfil')).not.toBeInTheDocument();
    expect(queryByText('Cerrar Sesión')).not.toBeInTheDocument();
  });

  it('should navigate to the profile page when the "Mi Perfil" link is clicked', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <Route path="/profile">
          <div>Profile Page</div>
        </Route>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText('Menu'));
    fireEvent.click(getByText('Mi Perfil'));

    expect(getByText('Profile Page')).toBeInTheDocument();
  });

  it('should navigate to the edit profile page when the "Editar Perfil" link is clicked', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <Route path="/edit-profile">
          <div>Edit Profile Page</div>
        </Route>
        <MenuBurguer currentPage="/profile" />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText('Menu'));
    fireEvent.click(getByText('Editar Perfil'));

    expect(getByText('Edit Profile Page')).toBeInTheDocument();
  });

  it('should navigate to the create recipe page when the "Crear Receta" link is clicked', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <Route path="/create-recipe">
          <div>Create Recipe Page</div>
        </Route>
        <MenuBurguer currentPage="/" />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText('Menu'));
    fireEvent.click(getByText('Crear Receta'));

    expect(getByText('Create Recipe Page')).toBeInTheDocument();
  });

  it('should navigate to the edit recipe page when the "Editar Receta" link is clicked', () => {
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <Route path="/edit-recipe/:id">
          <div>Edit Recipe Page</div>
        </Route>
        <MenuBurguer currentPage="/edit-recipe/1" />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText('Menu'));
    fireEvent.click(getByText('Editar Receta'));

    expect(getByText('Edit Recipe Page')).toBeInTheDocument();
  });

  it('should call the handleLogout function when the "Cerrar Sesión" link is clicked', () => {
    const handleLogout = jest.fn();
    const { getByAltText, getByText } = render(
      <MemoryRouter>
        <MenuBurguer currentPage="/" handleLogout={handleLogout} />
      </MemoryRouter>
    );

    fireEvent.click(getByAltText('Menu'));
    fireEvent.click(getByText('Cerrar Sesión'));

    expect(handleLogout).toHaveBeenCalled();
  });
});