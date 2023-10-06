import React from 'react';
import { render } from '@testing-library/react';
import Recipes from './Recipes';

describe('Recipes component', () => {
  const title = 'Spaghetti Carbonara';
  const ingredients = ['spaghetti', 'eggs', 'bacon', 'parmesan cheese'];
  const instructions = ['Cook spaghetti according to package instructions', 'Fry bacon until crispy', 'Beat eggs and parmesan cheese in a bowl', 'Add cooked spaghetti to the bacon and mix well', 'Add the egg mixture to the spaghetti and mix well', 'Serve hot'];

  it('renders the title, ingredients and instructions', () => {
    const { getByText } = render(<Recipes title={title} ingredients={ingredients} instructions={instructions} />);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText('Ingredientes:')).toBeInTheDocument();
    expect(getByText('Instrucciones:')).toBeInTheDocument();
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
    instructions.forEach(instruction => {
      expect(getByText(instruction)).toBeInTheDocument();
    });
  });

  it('renders only the title if no ingredients or instructions are provided', () => {
    const { getByText, queryByText } = render(<Recipes title={title} />);
    expect(getByText(title)).toBeInTheDocument();
    expect(queryByText('Ingredientes:')).toBeNull();
    expect(queryByText('Instrucciones:')).toBeNull();
  });
});