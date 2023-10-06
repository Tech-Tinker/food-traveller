import React from 'react';
import { render, screen } from '@testing-library/react';
import RecipesView from './RecipesView';

describe('RecipesView', () => {
  test('renders recipe details', async () => {
    const mockRecipes = [
      {
        id: 1,
        name: 'Pasta',
        image: 'pasta.jpg',
        description: 'Delicious pasta recipe',
        author: 'John Doe',
        time: '30 minutes',
        difficulty: 'Easy',
        ingredients: 'pasta, tomato sauce, cheese',
        preparation: 'Boil pasta. Add tomato sauce. Sprinkle cheese.',
      },
    ];

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockRecipes),
    });

    render(<RecipesView />);

    const recipeTitle = await screen.findByText('Receta de Pasta');
    expect(recipeTitle).toBeInTheDocument();

    const recipeDetails = await screen.findByTestId('recipe-details');
    expect(recipeDetails).toHaveTextContent('ID: 1');
    expect(recipeDetails).toHaveTextContent('Nombre: Pasta');
    expect(recipeDetails).toHaveTextContent('Imagen: pasta.jpg');
    expect(recipeDetails).toHaveTextContent('Descripción: Delicious pasta recipe');
    expect(recipeDetails).toHaveTextContent('Autor: John Doe');
    expect(recipeDetails).toHaveTextContent('Tiempo: 30 minutes');
    expect(recipeDetails).toHaveTextContent('Dificultad: Easy');
    expect(recipeDetails).toHaveTextContent('Ingredientes: pasta, tomato sauce, cheese');
    expect(recipeDetails).toHaveTextContent('Preparación: Boil pasta. Add tomato sauce. Sprinkle cheese.');
  });
});