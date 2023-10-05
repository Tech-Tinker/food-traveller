import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import Profilerecipes from './Profilerecipes';

describe('Profilerecipes', () => {
  const mockRecipes = [
    {
      id: 1,
      title: 'Recipe 1',
      image_url: 'https://example.com/recipe1.jpg',
    },
    {
      id: 2,
      title: 'Recipe 2',
      image_url: 'https://example.com/recipe2.jpg',
    },
  ];

  it('should render the recipes', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet('http://127.0.0.1:8000/api/recipes?user_id=1').reply(200, mockRecipes);

    render(
      <MemoryRouter>
        <Profilerecipes />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Recipe 1')).toBeInTheDocument();
      expect(screen.getByText('Recipe 2')).toBeInTheDocument();
    });
  });

  it('should render the recipe details when clicked', async () => {
    const mockAxios = new MockAdapter(axios);
    mockAxios.onGet('http://127.0.0.1:8000/api/recipes?user_id=1').reply(200, mockRecipes);

    render(
      <MemoryRouter>
        <Profilerecipes />
      </MemoryRouter>
    );

    await waitFor(() => {
      const recipeLink = screen.getByText('Recipe 1');
      recipeLink.click();
      expect(window.location.pathname).toBe('/recipe/1');
    });
  });
});