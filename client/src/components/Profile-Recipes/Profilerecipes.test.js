import React from 'react';
import { render, screen } from '@testing-library/react';
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

  it('renders a list of recipes', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet('http://127.0.0.1:8000/api/recipes?user_id=1').reply(200, mockRecipes);

    render(
      <MemoryRouter>
        <Profilerecipes />
      </MemoryRouter>
    );

    const recipeTitles = await screen.findAllByRole('heading', { level: 5 });
    expect(recipeTitles).toHaveLength(2);
    expect(recipeTitles[0]).toHaveTextContent('Recipe 1');
    expect(recipeTitles[1]).toHaveTextContent('Recipe 2');
  });
});