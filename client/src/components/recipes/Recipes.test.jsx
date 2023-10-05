import React from 'react';
import { render } from '@testing-library/react';
import Recipes from './Recipes';

describe('Recipes component', () => {
  it('renders the title, ingredients and instructions', () => {
    const title = 'Spaghetti Carbonara';
    const ingredients = ['spaghetti', 'eggs', 'bacon', 'parmesan cheese'];
    const instructions = ['Cook spaghetti according to package instructions', 'Fry bacon until crispy', 'Beat eggs and parmesan cheese in a bowl', 'Add cooked spaghetti to the pan with bacon', 'Pour egg mixture over spaghetti and stir until eggs are cooked'];
    const { getByText } = render(<Recipes title={title} ingredients={ingredients} instructions={instructions} />);
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText('Ingredientes:')).toBeInTheDocument();
    ingredients.forEach(ingredient => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
    expect(getByText('Instrucciones:')).toBeInTheDocument();
    instructions.forEach(instruction => {
      expect(getByText(instruction)).toBeInTheDocument();
    });
  });
});