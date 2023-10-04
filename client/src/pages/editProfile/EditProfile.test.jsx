import React from 'react';
import { shallow } from 'enzyme';
import EditProfile from './EditProfile';
import EditProfileForm from '../../components/editProfileForm/EditProfileForm';

describe('EditProfile', () => {
  it('should render EditProfileForm component', () => {
    const wrapper = shallow(<EditProfile />);
    expect(wrapper.find(EditProfileForm)).toHaveLength(1);
  });
});