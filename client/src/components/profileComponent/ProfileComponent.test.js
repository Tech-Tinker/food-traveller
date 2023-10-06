import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileComponent from './ProfileComponent';

describe('ProfileComponent', () => {
  it('should render the user name', () => {
    const userData = { name: 'John Doe' };
    render(<ProfileComponent userData={userData} />);
    const userName = screen.getByText('John Doe');
    expect(userName).toBeInTheDocument();
  });

  it('should render the edit profile button', () => {
    const userData = { name: 'John Doe' };
    render(<ProfileComponent userData={userData} />);
    const editProfileButton = screen.getByRole('link', { name: 'Editar Perfil' });
    expect(editProfileButton).toBeInTheDocument();
  });

  it('should render the avatar icon', () => {
    const userData = { name: 'John Doe' };
    render(<ProfileComponent userData={userData} />);
    const avatarIcon = screen.getByAltText('Avatar');
    expect(avatarIcon).toBeInTheDocument();
  });
});