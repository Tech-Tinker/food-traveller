import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateRecipeForm from './CreateRecipeForm';

describe('CreateRecipeForm', () => {
  it('should render all form fields', () => {
    render(<CreateRecipeForm />);
    expect(screen.getByLabelText('Nombre')).toBeInTheDocument();
    expect(screen.getByLabelText('Tiempo')).toBeInTheDocument();
    expect(screen.getByLabelText('Categoría')).toBeInTheDocument();
    expect(screen.getByLabelText('Dificultad')).toBeInTheDocument();
    expect(screen.getByLabelText('Ingredientes')).toBeInTheDocument();
    expect(screen.getByLabelText('Preparación')).toBeInTheDocument();
    expect(screen.getByLabelText('País')).toBeInTheDocument();
    expect(screen.getByLabelText('Imagen')).toBeInTheDocument();
  });

  it('should show error messages when form is submitted with invalid data', () => {
    render(<CreateRecipeForm />);
    fireEvent.click(screen.getByText('Añadir'));
    expect(screen.getByText('Este campo es obligatorio')).toBeInTheDocument();
  });

  it('should submit form with valid data', () => {
    render(<CreateRecipeForm />);
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Tortilla de patatas' } });
    fireEvent.change(screen.getByLabelText('Tiempo'), { target: { value: '30 minutos' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Entrante' } });
    fireEvent.change(screen.getByLabelText('Dificultad'), { target: { value: 'Fácil' } });
    fireEvent.change(screen.getByLabelText('Ingredientes'), { target: { value: '4 huevos, 2 patatas, aceite, sal' } });
    fireEvent.change(screen.getByLabelText('Preparación'), { target: { value: 'Pelar y cortar las patatas en rodajas finas. Batir los huevos en un bol y añadir las patatas. Saltear en una sartén con aceite caliente hasta que esté dorada por ambos lados. Servir caliente.' } });
    fireEvent.change(screen.getByLabelText('País'), { target: { value: 'España' } });
    fireEvent.change(screen.getByLabelText('Imagen'), { target: { files: [new File(['(⌐□_□)'], 'tortilla.jpg', { type: 'image/jpeg' })] } });
    fireEvent.click(screen.getByText('Añadir'));
    expect(screen.queryByText('Este campo es obligatorio')).not.toBeInTheDocument();
    // Add more expectations here to test the form submission
  });
});