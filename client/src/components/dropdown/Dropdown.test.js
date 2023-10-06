import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  it('renders without crashing', () => {
    shallow(<Dropdown />);
  });

  it('renders the select container', () => {
    const wrapper = shallow(<Dropdown />);
    expect(wrapper.find('.select-container')).toHaveLength(1);
  });

  it('renders the default option', () => {
    const wrapper = shallow(<Dropdown />);
    expect(wrapper.find('Select').prop('defaultValue')).toEqual({ label: 'Selecciona', value: 'Select' });
  });

  it('renders the options', () => {
    const wrapper = shallow(<Dropdown />);
    const options = [
      { label: 'Entrante', value: 'starter' },
      { label: 'Primero', value: 'first' },
      { label: 'Segundo', value: 'second' },
      { label: 'Postre', value: 'desert' }
    ];
    expect(wrapper.find('Select').prop('options')).toEqual(options);
  });
});