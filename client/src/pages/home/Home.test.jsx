import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Home from './Home';

jest.mock('axios');

describe('Home', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Recipe 1',
          description: 'This is recipe 1',
          image: 'recipe1.jpg',
        },
        {
          id: 2,
          title: 'Recipe 2',
          description: 'This is recipe 2',
          image: 'recipe2.jpg',
        },
      ],
    });
  });

  it('should render recipe posts', async () => {
    render(<Home />);

    const recipePosts = await screen.findAllByTestId('recipe-post');

    expect(recipePosts).toHaveLength(2);
  });

  it('should render an error message if the API call fails', async () => {
    axios.get.mockRejectedValue(new Error('API call failed'));

    render(<Home />);

    const errorMessage = await screen.findByText('Error al obtener las recetas:');

    expect(errorMessage).toBeInTheDocument();
  });
});