import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CreateRecipeForm from './CreateRecipeForm';

describe('CreateRecipeForm', () => {
  it('should render all form fields', () => {
    const { getByLabelText } = render(<CreateRecipeForm />);
    expect(getByLabelText('Tiempo')).toBeInTheDocument();
    expect(getByLabelText('Categoría')).toBeInTheDocument();
    expect(getByLabelText('Dificultad')).toBeInTheDocument();
    expect(getByLabelText('Ingredientes')).toBeInTheDocument();
    expect(getByLabelText('Preparación')).toBeInTheDocument();
    expect(getByLabelText('País')).toBeInTheDocument();
    expect(getByLabelText('Imagen')).toBeInTheDocument();
  });

  it('should update form fields when user types', () => {
    const { getByLabelText } = render(<CreateRecipeForm />);
    const timeInput = getByLabelText('Tiempo');
    const categorySelect = getByLabelText('Categoría');
    const difficultySelect = getByLabelText('Dificultad');
    const ingredientsTextarea = getByLabelText('Ingredientes');
    const preparationTextarea = getByLabelText('Preparación');
    const countryInput = getByLabelText('País');

    fireEvent.change(timeInput, { target: { value: '30 minutos' } });
    fireEvent.change(categorySelect, { target: { value: 'Entrante' } });
    fireEvent.change(difficultySelect, { target: { value: 'Fácil' } });
    fireEvent.change(ingredientsTextarea, { target: { value: '1 huevo\n100g de harina' } });
    fireEvent.change(preparationTextarea, { target: { value: 'Mezclar los ingredientes\nCocinar en sartén' } });
    fireEvent.change(countryInput, { target: { value: 'España' } });

    expect(timeInput.value).toBe('30 minutos');
    expect(categorySelect.value).toBe('Entrante');
    expect(difficultySelect.value).toBe('Fácil');
    expect(ingredientsTextarea.value).toBe('1 huevo\n100g de harina');
    expect(preparationTextarea.value).toBe('Mezclar los ingredientes\nCocinar en sartén');
    expect(countryInput.value).toBe('España');
  });

  it('should submit form when "Añadir" button is clicked', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<CreateRecipeForm onSubmit={handleSubmit} />);
    const addButton = getByText('Añadir');

    fireEvent.click(addButton);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});