import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import Home from './Home';
import Header from '../../components/header/Header';
import Nav from '../../components/nav/Nav';
import MapboxMap from '../../components/map/MapboxMap';
import RecipePost from '../../components/recipepost/RecipePost';

jest.mock('axios');

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Header component', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should render MapboxMap component', () => {
    expect(wrapper.find(MapboxMap)).toHaveLength(1);
  });

  it('should render Nav component', () => {
    expect(wrapper.find(Nav)).toHaveLength(1);
  });

  it('should render RecipePost components for each recipe', () => {
    const recipes = [
      { id: 1, title: 'Recipe 1', description: 'Description 1' },
      { id: 2, title: 'Recipe 2', description: 'Description 2' },
    ];

    axios.get.mockResolvedValue({ data: recipes });

    return wrapper.instance().componentDidMount().then(() => {
      wrapper.update();
      expect(wrapper.find(RecipePost)).toHaveLength(recipes.length);
    });
  });
});