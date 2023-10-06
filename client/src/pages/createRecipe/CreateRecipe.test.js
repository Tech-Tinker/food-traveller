import React from 'react';
import { shallow } from 'enzyme';
import CreateRecipe from './CreateRecipe';
import Header from '../../components/header/Header';
import CreateRecipeForm from '../../components/createRecipeForm/CreateRecipeForm';

describe('CreateRecipe', () => {
  it('should render Header and CreateRecipeForm components', () => {
    const wrapper = shallow(<CreateRecipe />);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(CreateRecipeForm)).toHaveLength(1);
  });
});