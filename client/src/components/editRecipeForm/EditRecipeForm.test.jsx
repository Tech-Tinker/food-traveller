import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditRecipeForm from './EditRecipeForm';

describe('EditRecipeForm', () => {
  let getByLabelText, getByText;

  beforeEach(() => {
    const renderResult = render(<EditRecipeForm />);
    getByLabelText = renderResult.getByLabelText;
    getByText = renderResult.getByText;
  });

  it('should render all form fields', () => {
    expect(getByLabelText('Categoría')).toBeInTheDocument();
    expect(getByLabelText('Dificultad')).toBeInTheDocument();
    expect(getByLabelText('Ingredientes')).toBeInTheDocument();
    expect(getByLabelText('Preparación')).toBeInTheDocument();
    expect(getByLabelText('País')).toBeInTheDocument();
    expect(getByLabelText('Imagen')).toBeInTheDocument();
  });

  it('should update state when form fields change', () => {
    const categoryInput = getByLabelText('Categoría');
    const difficultyInput = getByLabelText('Dificultad');
    const ingredientsInput = getByLabelText('Ingredientes');
    const preparationInput = getByLabelText('Preparación');
    const countryInput = getByLabelText('País');
    const imageInput = getByLabelText('Imagen');

    fireEvent.change(categoryInput, { target: { value: 'Entrante' } });
    fireEvent.change(difficultyInput, { target: { value: 'Fácil' } });
    fireEvent.change(ingredientsInput, { target: { value: '1 huevo' } });
    fireEvent.change(preparationInput, { target: { value: 'Batir el huevo' } });
    fireEvent.change(countryInput, { target: { value: 'España' } });
    fireEvent.change(imageInput, {
      target: {
        files: [new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })]
      }
    });

    expect(categoryInput.value).toBe('Entrante');
    expect(difficultyInput.value).toBe('Fácil');
    expect(ingredientsInput.value).toBe('1 huevo');
    expect(preparationInput.value).toBe('Batir el huevo');
    expect(countryInput.value).toBe('España');
    expect(imageInput.files[0].name).toBe('chucknorris.png');
  });

  it('should call onSubmit when "Añadir" button is clicked', () => {
    const handleSubmit = jest.fn();
    const addButton = getByText('Añadir');
    fireEvent.click(addButton);
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
