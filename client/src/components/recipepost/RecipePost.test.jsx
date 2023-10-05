import React from 'react';
import { render } from '@testing-library/react';
import RecipePost from './RecipePost';

describe('RecipePost', () => {
  const recipe = {
    id: 1,
    title: 'Test Recipe',
    category: 'Dessert',
    country: 'Italy',
    image_url: 'https://example.com/image.jpg',
  };

  it('renders the recipe title', () => {
    const { getByText } = render(<RecipePost recipe={recipe} />);
    expect(getByText(recipe.title)).toBeInTheDocument();
  });

  it('renders the recipe category', () => {
    const { getByText } = render(<RecipePost recipe={recipe} />);
    expect(getByText(recipe.category)).toBeInTheDocument();
  });

  it('renders the recipe country', () => {
    const { getByText } = render(<RecipePost recipe={recipe} />);
    expect(getByText(`Inspirado en la gastronomía de ${recipe.country}`)).toBeInTheDocument();
  });

  it('renders the recipe image', () => {
    const { getByAltText } = render(<RecipePost recipe={recipe} />);
    expect(getByAltText(recipe.title)).toBeInTheDocument();
  });
});
