import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  it('renders without crashing', () => {
    shallow(<Dropdown />);
  });

  it('renders the default option', () => {
    const wrapper = shallow(<Dropdown />);
    const select = wrapper.find('Select');
    expect(select.prop('defaultValue')).toEqual({ label: 'Selecciona', value: 'Select' });
  });

  it('renders the correct options', () => {
    const wrapper = shallow(<Dropdown />);
    const select = wrapper.find('Select');
    expect(select.prop('options')).toEqual([
      { label: 'Entrante', value: 'starter' },
      { label: 'Primero', value: 'first' },
      { label: 'Segundo', value: 'second' },
      { label: 'Postre', value: 'desert' }
    ]);
  });
});