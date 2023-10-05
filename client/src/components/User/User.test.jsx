import React from 'react';
import { render, screen } from '@testing-library/react';
import User from './User';

jest.mock('../../services/ApiServices', () => ({
  getProfile: jest.fn(() => Promise.resolve({
    profile: {
      user_name: 'John Doe',
      description: 'Lorem ipsum dolor sit amet',
      country: 'USA',
      interests: 'Italian cuisine',
      culinary_experience: 'Intermediate'
    },
    image_url: 'https://example.com/avatar.jpg'
  }))
}));

describe('User component', () => {
  it('should render the user profile', async () => {
    render(<User />);

    expect(screen.getByText('Cargando perfil de usuario...')).toBeInTheDocument();

    const profileData = await screen.findByText('John Doe');

    expect(profileData).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Me interesa la comida...Italian cuisine')).toBeInTheDocument();
    expect(screen.getByText('En la cocina me considero... Intermediate')).toBeInTheDocument();
    expect(screen.getByAltText('Avatar')).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });
});