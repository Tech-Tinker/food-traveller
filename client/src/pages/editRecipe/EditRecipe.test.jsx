import React from 'react';
import { shallow } from 'enzyme';
import EditRecipe from './EditRecipe';
import Header from '../../components/header/Header';
import EditRecipeForm from '../../components/editRecipeForm/EditRecipeForm';

describe('EditRecipe', () => {
  it('should render Header and EditRecipeForm components', () => {
    const wrapper = shallow(<EditRecipe />);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(EditRecipeForm)).toHaveLength(1);
  });
});