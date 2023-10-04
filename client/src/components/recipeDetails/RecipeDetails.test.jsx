import {  screen } from '@testing-library/react';
import { getRecipeById } from '../../services/ApiServices';

jest.mock('../../services/ApiServices');

describe('RecipeDetails', () => {
  const mockRecipe = {
    recipe: {
      title: 'Mock Recipe',
      image: 'mock-image.jpg',
      country: 'Mock Country',
      difficulty: 'Easy',
      time: '30 minutes',
      description: 'Mock description',
      ingredients: 'Mock ingredients',
      preparation: 'Mock preparation',
    },
    username: 'Mock User',
    category: 'Mock Category',
  };

  beforeEach(() => {
    getRecipeById.mockResolvedValue(mockRecipe);

  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render recipe details', async () => {

    expect(getRecipeById).toHaveBeenCalledWith(mockRecipe.id);
    expect(getRecipeById).toHaveBeenCalledTimes(1);

    await screen.findByText(mockRecipe.recipe.title);
    expect(screen.getByText(mockRecipe.recipe.title)).toBeInTheDocument();
    expect(screen.getByAltText('Go back icon')).toBeInTheDocument();
    expect(screen.getByAltText('Go back icon')).toHaveAttribute('src', 'back.svg');
    expect(screen.getByAltText('Mock Recipe')).toBeInTheDocument();
    expect(screen.getByAltText('Mock Recipe')).toHaveAttribute('src', 'mock-image.jpg');
    expect(screen.getByText('Mock User')).toBeInTheDocument();
    expect(screen.getByText('Mock Country')).toBeInTheDocument();
    expect(screen.getByText('Easy')).toBeInTheDocument();
    expect(screen.getByText('30 minutes')).toBeInTheDocument();
    expect(screen.getByText('Mock Category')).toBeInTheDocument();
    expect(screen.getByText('Mock description')).toBeInTheDocument();


  });

  it('should render recipe details with ingredients and preparation', async () => {
    await screen.findByText('Mock description');

    expect(screen.getByText('Mock description')).toBeInTheDocument();
    expect(screen.queryByText('Mock ingredients')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock preparation')).not.toBeInTheDocument();
  

    screen.getByText('Ingredientes').click();

    expect(screen.queryByText('Mock description')).not.toBeInTheDocument();
    expect(screen.getByText('Mock ingredients')).toBeInTheDocument();
    expect(screen.queryByText('Mock preparation')).not.toBeInTheDocument();

    screen.getByText('Preparación').click();

    expect(screen.queryByText('Mock description')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock ingredients')).not.toBeInTheDocument();
    expect(screen.getByText('Mock preparation')).toBeInTheDocument();
  });
});