import React from 'react';
import { shallow } from 'enzyme';
import EditRecipe from './EditRecipe';
import Header from '../../components/header/Header';
import EditRecipeForm from '../../components/editRecipeForm/EditRecipeForm';

describe('EditRecipe', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<EditRecipe />);
  });

  it('should render Header component', () => {
    expect(wrapper.find(Header)).toHaveLength(1);
  });

  it('should render EditRecipeForm component', () => {
    expect(wrapper.find(EditRecipeForm)).toHaveLength(1);
  });
});