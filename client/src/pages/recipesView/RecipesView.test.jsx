import React from 'react';
import { shallow } from 'enzyme';
import Axios from 'axios';
import RecipesView from './RecipesView';
import Recipes from '../../components/recipes/Recipes';

jest.mock('axios');

describe('RecipesView', () => {
  let wrapper;
  const mockRecipes = [
    {
      id: 1,
      name: 'Pasta',
      image: 'pasta.jpg',
      description: 'Delicious pasta recipe',
      author: 'John Doe',
      time: '30 minutes',
      difficulty: 'Easy',
      ingredients: 'pasta, tomato sauce, cheese',
      preparation: 'Boil pasta. Add tomato sauce. Sprinkle cheese.',
    },
    {
      id: 2,
      name: 'Pizza',
      image: 'pizza.jpg',
      description: 'Amazing pizza recipe',
      author: 'Jane Smith',
      time: '45 minutes',
      difficulty: 'Medium',
      ingredients: 'dough, tomato sauce, cheese, pepperoni',
      preparation: 'Roll out dough. Add tomato sauce. Sprinkle cheese and pepperoni.',
    },
  ];

  beforeEach(() => {
    Axios.get.mockResolvedValue({ data: mockRecipes });
    wrapper = shallow(<RecipesView />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Recipes component for each recipe', () => {
    expect(wrapper.find(Recipes)).toHaveLength(mockRecipes.length);
  });

  it('should pass the correct props to the Recipes component', () => {
    const recipeComponents = wrapper.find(Recipes);
    recipeComponents.forEach((recipeComponent, index) => {
      expect(recipeComponent.prop('title')).toEqual(mockRecipes[index].name);
      expect(recipeComponent.prop('ingredients')).toEqual(mockRecipes[index].ingredients.split(', '));
      expect(recipeComponent.prop('instructions')).toEqual(mockRecipes[index].preparation.split('. '));
    });
  });

  it('should render the recipe details for each recipe', () => {
    const recipeDetails = wrapper.find('.recipe-details');
    expect(recipeDetails).toHaveLength(mockRecipes.length);
  });

  it('should render the correct recipe details', () => {
    const recipeDetails = wrapper.find('.recipe-details');
    recipeDetails.forEach((recipeDetail, index) => {
      expect(recipeDetail.find('p').at(0).text()).toEqual(`ID: ${mockRecipes[index].id}`);
      expect(recipeDetail.find('p').at(1).text()).toEqual(`Nombre: ${mockRecipes[index].name}`);
      expect(recipeDetail.find('p').at(2).text()).toEqual(`Imagen: ${mockRecipes[index].image}`);
      expect(recipeDetail.find('p').at(3).text()).toEqual(`Descripción: ${mockRecipes[index].description}`);
      expect(recipeDetail.find('p').at(4).text()).toEqual(`Autor: ${mockRecipes[index].author}`);
      expect(recipeDetail.find('p').at(5).text()).toEqual(`Tiempo: ${mockRecipes[index].time}`);
      expect(recipeDetail.find('p').at(6).text()).toEqual(`Dificultad: ${mockRecipes[index].difficulty}`);
      expect(recipeDetail.find('p').at(7).text()).toEqual(`Ingredientes: ${mockRecipes[index].ingredients}`);
      expect(recipeDetail.find('p').at(8).text()).toEqual(`Preparación: ${mockRecipes[index].preparation}`);
    });
  });

  it('should handle errors when fetching recipes', () => {
    const error = new Error('Error fetching recipes');
    Axios.get.mockRejectedValue(error);
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    shallow(<RecipesView />);
    expect(consoleSpy).toHaveBeenCalledWith('Error al obtener los datos de la receta:', error);
    consoleSpy.mockRestore();
  });
});

