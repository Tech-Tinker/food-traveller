import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import RecipeDetails from './RecipeDetails';
import { getRecipeById } from '../../services/ApiServices';

jest.mock('../../services/ApiServices');

describe('RecipeDetails', () => {
  beforeEach(() => {
    getRecipeById.mockResolvedValue({
      recipe: {
        title: 'Test Recipe',
        country: 'Test Country',
        difficulty: 'Easy',
        time: '30 minutes',
        description: 'Test description',
        ingredients: 'Test ingredients',
        preparation: 'Test preparation',
      },
      username: 'Test User',
      category: 'Test Category',
      image_url: 'https://test.com/image.jpg',
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the recipe title', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const title = await screen.findByText('Test Recipe');
    expect(title).toBeInTheDocument();
  });

  it('renders the recipe image', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const image = await screen.findByAltText('Test Recipe');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://test.com/image.jpg');
  });

  it('renders the recipe username', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const username = await screen.findByText('Test User');
    expect(username).toBeInTheDocument();
  });

  it('renders the recipe country', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const country = await screen.findByText('Test Country');
    expect(country).toBeInTheDocument();
  });

  it('renders the recipe difficulty', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const difficulty = await screen.findByText('Easy');
    expect(difficulty).toBeInTheDocument();
  });

  it('renders the recipe time', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const time = await screen.findByText('30 minutes');
    expect(time).toBeInTheDocument();
  });

  it('renders the recipe category', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const category = await screen.findByText('Test Category');
    expect(category).toBeInTheDocument();
  });

  it('renders the recipe description by default', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const description = await screen.findByText('Test description');
    expect(description).toBeInTheDocument();
  });

  it('renders the recipe ingredients when selected', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const ingredientsButton = await screen.findByText('Ingredientes');
    ingredientsButton.click();

    const ingredients = await screen.findByText('Test ingredients');
    expect(ingredients).toBeInTheDocument();
  });

  it('renders the recipe preparation when selected', async () => {
    render(
      <MemoryRouter initialEntries={['/recipe/1']}>
        <Route path="/recipe/:id">
          <RecipeDetails />
        </Route>
      </MemoryRouter>
    );

    const preparationButton = await screen.findByText('Preparación');
    preparationButton.click();

    const preparation = await screen.findByText('Test preparation');
    expect(preparation).toBeInTheDocument();
  });
});