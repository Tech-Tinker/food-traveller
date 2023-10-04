import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Menu component', () => {  // 1
  const mockSetRecipes = jest.fn();
  const mockDeleteRecipe = jest.fn();
  const recipes = [
    { id: 1, name: 'Recipe 1' },
    { id: 2, name: 'Recipe 2' },
    { id: 3, name: 'Recipe 3' },
  ];

  it('should render the component', () => {
    const { getByAltText } = render(<Menu />);
    expect(getByAltText('ellipsis')).toBeInTheDocument();
  

  });

  it('should toggle the menu when the icon is clicked', () => {
    const { getByAltText, getByRole } = render(<Menu />);
    const icon = getByAltText('ellipsis');
    fireEvent.click(icon);
    expect(getByRole('list')).toBeInTheDocument();
    fireEvent.click(icon);
    expect(getByRole('list')).not.toBeInTheDocument();
  });

  it('should render the edit and delete options when on the profile page', () => {
    const { getByText } = render(<Menu currentPage="/profile" recipeId={1} recipes={recipes} setRecipes={mockSetRecipes} />);
    expect(getByText('Editar Receta')).toBeInTheDocument();
    expect(getByText('Eliminar receta')).toBeInTheDocument();
    expect(getByText('Ver receta')).toBeInTheDocument();
  });

  it('should call the deleteRecipe function and update the recipe list when the delete button is clicked', () => {
    const { getByText } = render(<Menu currentPage="/profile" recipeId={1} recipes={recipes} setRecipes={mockSetRecipes} />);
    const deleteButton = getByText('Eliminar receta');
  console.log(deleteButton);
    fireEvent.click(deleteButton);
    expect(mockDeleteRecipe).toHaveBeenCalledTimes(1);
    expect(mockSetRecipes).toHaveBeenCalledTimes(1);
  });

});