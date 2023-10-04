import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateRecipeForm from './CreateRecipeForm';  

describe('CreateRecipeForm', () => {
  it('should render all form fields', () => {
    const { getByLabelText } = render(<CreateRecipeForm />);
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Tiempo')).toBeInTheDocument();
    expect(getByLabelText('Categoría')).toBeInTheDocument();
    expect(getByLabelText('Dificultad')).toBeInTheDocument();
    expect(getByLabelText('Ingredientes')).toBeInTheDocument();
    expect(getByLabelText('Preparación')).toBeInTheDocument();
    expect(getByLabelText('País')).toBeInTheDocument();
    expect(getByLabelText('Imagen')).toBeInTheDocument();
  });

  it('should update state when form fields are changed', () => {
    const { getByLabelText } = render(<CreateRecipeForm />);
    const nameInput = getByLabelText('Nombre');
    const timeInput = getByLabelText('Tiempo');
    const categorySelect = getByLabelText('Categoría');
    const difficultySelect = getByLabelText('Dificultad');
    const ingredientsTextarea = getByLabelText('Ingredientes');
    const preparationTextarea = getByLabelText('Preparación');
    const countryInput = getByLabelText('País');
    const imageInput = getByLabelText('Imagen');

    fireEvent.change(nameInput, { target: { value: 'Test Recipe' } });
    fireEvent.change(timeInput, { target: { value: '30 minutes' } });
    fireEvent.change(categorySelect, { target: { value: 'Entrante' } });
    fireEvent.change(difficultySelect, { target: { value: 'Fácil' } });
    fireEvent.change(ingredientsTextarea, { target: { value: 'Test Ingredient 1\nTest Ingredient 2' } });
    fireEvent.change(preparationTextarea, { target: { value: 'Test Step 1\nTest Step 2' } });
    fireEvent.change(countryInput, { target: { value: 'Test Country' } });
    fireEvent.change(imageInput, { target: { value: 'https://test.com/image.jpg' } });

    expect(nameInput.value).toBe('Test Recipe');
    expect(timeInput.value).toBe('30 minutes');
    expect(categorySelect.value).toBe('Entrante');
    expect(difficultySelect.value).toBe('Fácil');
    expect(ingredientsTextarea.value).toBe('Test Ingredient 1\nTest Ingredient 2');
    expect(preparationTextarea.value).toBe('Test Step 1\nTest Step 2');
    expect(countryInput.value).toBe('Test Country');
    expect(imageInput.value).toBe('https://test.com/image.jpg');
  });

  it('should show error messages when form fields are invalid', () => {
    const { getByLabelText, getByText } = render(<CreateRecipeForm />);
    const nameInput = getByLabelText('Nombre');
    const timeInput = getByLabelText('Tiempo');
    const categorySelect = getByLabelText('Categoría');
    const difficultySelect = getByLabelText('Dificultad');
    const ingredientsTextarea = getByLabelText('Ingredientes');
    const preparationTextarea = getByLabelText('Preparación');
    const countryInput = getByLabelText('País');
    const imageInput = getByLabelText('Imagen');

    fireEvent.change(nameInput, { target: { value: '' } });
    fireEvent.change(timeInput, { target: { value: '' } });
    fireEvent.change(categorySelect, { target: { value: 'Selecciona' } });
    fireEvent.change(difficultySelect, { target: { value: 'Selecciona' } });
    fireEvent.change(ingredientsTextarea, { target: { value: '' } });
    fireEvent.change(preparationTextarea, { target: { value: '' } });
    fireEvent.change(countryInput, { target: { value: '' } });
    fireEvent.change(imageInput, { target: { value: '' } });

    expect(getByText('Este campo es obligatorio')).toBeInTheDocument();

  });
});