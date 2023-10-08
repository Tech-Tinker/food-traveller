import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Menu component', () => {
  const mockSetRecipes = jest.fn();
  const mockDeleteRecipe = jest.fn();

  const recipes = [
    { id: 1, name: 'Recipe 1' },
    { id: 2, name: 'Recipe 2' },
    { id: 3, name: 'Recipe 3' },
  ];

  beforeEach(() => {
    mockSetRecipes.mockClear();
    mockDeleteRecipe.mockClear();
  });

  it('should render the menu icon', () => {
    const { getByAltText } = render(<Menu />);
    expect(getByAltText('menu icon')).toBeInTheDocument();
  });

  it('should show the menu when the icon is clicked', () => {
    const { getByAltText, getByTestId } = render(<Menu />);
    fireEvent.click(getByAltText('menu icon'));
    expect(getByTestId('menu-overlay')).toBeInTheDocument();
  });

  it('should hide the menu when the close button is clicked', () => {
    const { getByAltText, getByTestId, getByLabelText } = render(<Menu />);
    fireEvent.click(getByAltText('menu icon'));
    fireEvent.click(getByLabelText('close menu'));
    expect(getByTestId('menu-overlay')).not.toBeInTheDocument();
  });

  it('should show the edit and delete options when on the profile page', () => {
    const { getByAltText, getByText } = render(
      <Menu currentPage="/profile" recipeId={1} recipes={recipes} setRecipes={mockSetRecipes} deleteRecipe={mockDeleteRecipe} />
    );
    fireEvent.click(getByAltText('menu icon'));
    expect(getByText('Editar Receta')).toBeInTheDocument();
    expect(getByText('Eliminar receta')).toBeInTheDocument();
  });

  it('should call the deleteRecipe function and update the recipe list when the delete button is clicked', () => {
    const { getByAltText, getByText } = render(
      <Menu currentPage="/profile" recipeId={1} recipes={recipes} setRecipes={mockSetRecipes} deleteRecipe={mockDeleteRecipe} />
    );
    fireEvent.click(getByAltText('menu icon'));
    fireEvent.click(getByText('Eliminar receta'));
    expect(mockDeleteRecipe).toHaveBeenCalledTimes(1);
    expect(mockSetRecipes).toHaveBeenCalledTimes(1);
  });
});