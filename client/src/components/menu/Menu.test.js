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

  it('should render the component', () => {
    const { getByText } = render(<Menu currentPage="/profile" recipeId={1} recipes={recipes} setRecipes={mockSetRecipes} />);
    expect(getByText('Editar Receta')).toBeInTheDocument();
    expect(getByText('Eliminar receta')).toBeInTheDocument();
  });

  it('should call handleDelete function when delete button is clicked', () => {
    const { getByText } = render(<Menu currentPage="/profile" recipeId={1} recipes={recipes} setRecipes={mockSetRecipes} />);
    fireEvent.click(getByText('Eliminar receta'));
    expect(mockDeleteRecipe).toHaveBeenCalled();
    expect(mockSetRecipes).toHaveBeenCalled();
  });

  it('should not render edit and delete buttons when currentPage is not /profile', () => {
    const { queryByText } = render(<Menu currentPage="/" recipeId={1} recipes={recipes} setRecipes={mockSetRecipes} />);
    expect(queryByText('Editar Receta')).toBeNull();
    expect(queryByText('Eliminar receta')).toBeNull();
  });
});