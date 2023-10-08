import React from 'react';
import { render } from '@testing-library/react';
import Recipes from './Recipes';


describe('Recipes', () => {
  it('renders the title', () => {
    const { getByText } = render(<Recipes title="Test Recipe" />);
    expect(getByText('Test Recipe')).toBeInTheDocument();
  });

  it('renders ingredients', () => {
    const ingredients = ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'];
    const { getByText } = render(<Recipes ingredients={ingredients} />);
    ingredients.forEach((ingredient) => {
      expect(getByText(ingredient)).toBeInTheDocument();
    });
  });

  it('renders instructions', () => {
    const instructions = ['Step 1', 'Step 2', 'Step 3'];
    const { getByText } = render(<Recipes instructions={instructions} />);
    instructions.forEach((step) => {
      expect(getByText(step)).toBeInTheDocument();
    });
  });

  it('handles missing ingredients', () => {
    const { container } = render(<Recipes />);
    const ingredientsList = container.querySelector('ul');
    expect(ingredientsList).toBeEmptyDOMElement();
  });

  it('handles missing instructions', () => {
    const { container } = render(<Recipes />);
    const instructionsList = container.querySelector('ol');
    expect(instructionsList).toBeEmptyDOMElement();
  });

  it('handles missing title', () => {
    const { container } = render(<Recipes />);
    const title = container.querySelector('h1');
    expect(title).toBeEmptyDOMElement();
  });
});
