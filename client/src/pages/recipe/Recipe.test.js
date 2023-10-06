import React from 'react';
import { render } from '@testing-library/react';
import Recipe from './Recipe';

describe('Recipe component', () => {
  it('should render RecipeDetails and Nav components', () => {
    const { getByTestId } = render(<Recipe />);
    expect(getByTestId('recipe-details')).toBeInTheDocument();
    expect(getByTestId('nav')).toBeInTheDocument();
  });
});