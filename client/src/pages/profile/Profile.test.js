import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

describe('Profile component', () => {
  test('renders header, user, profile recipes and nav components', () => {
    render(<Profile />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('user')).toBeInTheDocument();
    expect(screen.getByTestId('profile-recipes')).toBeInTheDocument();
    expect(screen.getByTestId('nav')).toBeInTheDocument();
  });
});