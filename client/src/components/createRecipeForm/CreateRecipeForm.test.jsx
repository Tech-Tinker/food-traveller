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

  it('should update state when form fields are changed', () => {
    const { getByLabelText } = render(<CreateRecipeForm />);
    const timeInput = getByLabelText('Tiempo');
    const categorySelect = getByLabelText('Categoría');
    const difficultySelect = getByLabelText('Dificultad');
    const ingredientsTextarea = getByLabelText('Ingredientes');
    const preparationTextarea = getByLabelText('Preparación');
    const countryInput = getByLabelText('País');
    const imageInput = getByLabelText('Imagen');

    fireEvent.change(timeInput, { target: { value: '30 minutos' } });
    expect(timeInput.value).toBe('30 minutos');

    fireEvent.change(categorySelect, { target: { value: 'Entrante' } });
    expect(categorySelect.value).toBe('Entrante');

    fireEvent.change(difficultySelect, { target: { value: 'Fácil' } });
    expect(difficultySelect.value).toBe('Fácil');

    fireEvent.change(ingredientsTextarea, { target: { value: '1 taza de harina\n1 huevo\n1 taza de leche' } });
    expect(ingredientsTextarea.value).toBe('1 taza de harina\n1 huevo\n1 taza de leche');

    fireEvent.change(preparationTextarea, { target: { value: 'Mezclar los ingredientes\nCalentar la sartén\nCocinar las tortitas' } });
    expect(preparationTextarea.value).toBe('Mezclar los ingredientes\nCalentar la sartén\nCocinar las tortitas');

    fireEvent.change(countryInput, { target: { value: 'México' } });
    expect(countryInput.value).toBe('México');

    const imageFile = new File(['()'], 'test.png', { type: 'image/png' });
    fireEvent.change(imageInput, { target: { files: [imageFile] } });
    expect(imageInput.files[0]).toBe(imageFile);
  });

  it('should call onSubmit when the form is submitted', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<CreateRecipeForm onSubmit={handleSubmit} />);
    const addButton = getByText('Añadir');
    fireEvent.click(addButton);
    expect(handleSubmit).toHaveBeenCalled();
  });
});