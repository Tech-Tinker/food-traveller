import React from 'react';
import { shallow } from 'enzyme';
import Dropdown from './Dropdown';

describe('Dropdown', () => {
  it('renders without crashing', () => {
    shallow(<Dropdown />);
  });

  it('renders the Select component', () => {
    const wrapper = shallow(<Dropdown />);
    expect(wrapper.find('Select')).toHaveLength(1);
  });

  it('renders the correct options', () => {
    const wrapper = shallow(<Dropdown />);
    const options = [
      { label: 'Entrante', value: 'starter' },
      { label: 'Primero', value: 'first' },
      { label: 'Segundo', value: 'second' },
      { label: 'Postre', value: 'desert' }
    ];
    expect(wrapper.find('Select').prop('options')).toEqual(options);
  });

  it('renders the default value', () => {
    const wrapper = shallow(<Dropdown />);
    expect(wrapper.find('Select').prop('defaultValue')).toEqual({ label: 'Selecciona', value: 'Select' });
  });
});