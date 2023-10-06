import React from 'react';
import { shallow } from 'enzyme';
import RegisterView from './RegisterView';
import Header from '../../components/header/Header';
import RegisterForm from '../../components/registerForm/RegisterForm';

describe('RegisterView', () => {
  it('should render Header and RegisterForm components', () => {
    const wrapper = shallow(<RegisterView />);
    expect(wrapper.find(Header)).toHaveLength(1);
    expect(wrapper.find(RegisterForm)).toHaveLength(1);
  });
});