import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import { getRecipeById } from '../../services/ApiServices';

jest.mock('../../services/ApiServices');

describe('RecipeDetails', () => {
  const mockRecipe = {
    recipe: {
      title: 'Mock Recipe',
      country: 'Mock Country',
      difficulty: 'Easy',
      time: '30 minutes',
      description: 'Mock description',
      ingredients: 'Mock ingredients',
      preparation: 'Mock preparation',
    },
    username: 'Mock User',
    category: 'Mock Category',
    image_url: 'https://mockimage.com',
  };

  beforeEach(() => {
    getRecipeById.mockResolvedValue(mockRecipe);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the recipe details', async () => {
    render(
      <MemoryRouter initialEntries={[`/recipe/${mockRecipe.id}`]}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    expect(screen.getByAltText('Go back icon')).toBeInTheDocument();
    expect(await screen.findByText(mockRecipe.recipe.title)).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', mockRecipe.image_url);
    expect(screen.getByText(mockRecipe.username)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.recipe.country)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.recipe.difficulty)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.recipe.time)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.category)).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.recipe.description)).toBeInTheDocument();

    // Click on the "Ingredientes" button
    const ingredientsButton = screen.getByText('Ingredientes');
    ingredientsButton.click();
    expect(screen.getByText(mockRecipe.recipe.ingredients)).toBeInTheDocument();

    // Click on the "Preparación" button
    const preparationButton = screen.getByText('Preparación');
    preparationButton.click();
    expect(screen.getByText(mockRecipe.recipe.preparation)).toBeInTheDocument();
  });

  it('handles errors when fetching the recipe', async () => {
    const errorMessage = 'Error fetching show info';
    getRecipeById.mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter initialEntries={[`/recipe/${mockRecipe.id}`]}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });
});