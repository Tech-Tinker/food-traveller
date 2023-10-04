import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditRecipeForm from './EditRecipeForm';

describe('EditRecipeForm', () => {
  test('should update state when input values change', () => {
    const { getByLabelText } = render(<EditRecipeForm />);
    const nameInput = getByLabelText('Nombre');
    const timeInput = getByLabelText('Tiempo');
    const categorySelect = getByLabelText('Categoría');
    const difficultySelect = getByLabelText('Dificultad');
    const ingredientsTextarea = getByLabelText('Ingredientes');
    const preparationTextarea = getByLabelText('Preparación');
    const countryInput = getByLabelText('País');
    const imageInput = getByLabelText('Imagen');

    fireEvent.change(nameInput, { target: { value: 'Test Recipe' } });
    fireEvent.change(timeInput, { target: { value: '30' } });
    fireEvent.change(categorySelect, { target: { value: 'Entrante' } });
    fireEvent.change(difficultySelect, { target: { value: 'Fácil' } });
    fireEvent.change(ingredientsTextarea, { target: { value: 'Ingredient 1\nIngredient 2' } });
    fireEvent.change(preparationTextarea, { target: { value: 'Step 1\nStep 2' } });
    fireEvent.change(countryInput, { target: { value: 'Spain' } });
    fireEvent.change(imageInput, { target: { value: 'https://example.com/image.jpg' } });

    expect(nameInput.value).toBe('Test Recipe');
    expect(timeInput.value).toBe('30');
    expect(categorySelect.value).toBe('Entrante');
    expect(difficultySelect.value).toBe('Fácil');
    expect(ingredientsTextarea.value).toBe('Ingredient 1\nIngredient 2');
    expect(preparationTextarea.value).toBe('Step 1\nStep 2');
    expect(countryInput.value).toBe('Spain');
    expect(imageInput.value).toBe('https://example.com/image.jpg');
  });

  test('should call onSubmit when form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<EditRecipeForm onSubmit={handleSubmit} />);
    const submitButton = getByText('Añadir');

    fireEvent.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});