import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditRecipeForm from './EditRecipeForm';

describe('EditRecipeForm', () => {
  it('should render all form fields', () => {
    const { getByLabelText } = render(<EditRecipeForm />);
    expect(getByLabelText('Categoría')).toBeInTheDocument();
    expect(getByLabelText('Dificultad')).toBeInTheDocument();
    expect(getByLabelText('Ingredientes')).toBeInTheDocument();
    expect(getByLabelText('Preparación')).toBeInTheDocument();
    expect(getByLabelText('País')).toBeInTheDocument();
    expect(getByLabelText('Imagen')).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    const { getByLabelText } = render(<EditRecipeForm />);
    const categoryInput = getByLabelText('Categoría');
    fireEvent.change(categoryInput, { target: { value: 'Entrante' } });
    expect(categoryInput.value).toBe('Entrante');

    const difficultyInput = getByLabelText('Dificultad');
    fireEvent.change(difficultyInput, { target: { value: 'Fácil' } });
    expect(difficultyInput.value).toBe('Fácil');

    const ingredientsInput = getByLabelText('Ingredientes');
    fireEvent.change(ingredientsInput, { target: { value: '1 huevo, 2 rebanadas de pan' } });
    expect(ingredientsInput.value).toBe('1 huevo, 2 rebanadas de pan');

    const preparationInput = getByLabelText('Preparación');
    fireEvent.change(preparationInput, { target: { value: 'Batir el huevo, tostar el pan' } });
    expect(preparationInput.value).toBe('Batir el huevo, tostar el pan');

    const countryInput = getByLabelText('País');
    fireEvent.change(countryInput, { target: { value: 'España' } });
    expect(countryInput.value).toBe('España');
  });

  it('should call onSubmit when user clicks "Añadir" button', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<EditRecipeForm onSubmit={handleSubmit} />);
    fireEvent.click(getByText('Añadir'));
    expect(handleSubmit).toHaveBeenCalled();
  });
});