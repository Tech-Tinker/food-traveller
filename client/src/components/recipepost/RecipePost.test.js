import React from 'react';
import { render } from '@testing-library/react';
import RecipePost from './RecipePost';

describe('RecipePost', () => {
  const recipe = {
    id: 1,
    title: 'Test Recipe',
    country: 'Italy',
    image_url: 'https://example.com/image.jpg',
  };

  it('renders the recipe title', () => {
    const { getByText } = render(<RecipePost recipe={recipe} />);
    const titleElement = getByText(recipe.title);
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the recipe country', () => {
    const { getByText } = render(<RecipePost recipe={recipe} />);
    const countryElement = getByText(`Inspirado en la gastronomía de ${recipe.country}`);
    expect(countryElement).toBeInTheDocument();
  });

  it('renders the recipe image', () => {
    const { getByAltText } = render(<RecipePost recipe={recipe} />);
    const imageElement = getByAltText(recipe.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(recipe.image_url);
  });
});