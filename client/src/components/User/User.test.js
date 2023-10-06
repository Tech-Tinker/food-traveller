import React from 'react';
import { render, screen } from '@testing-library/react';
import User from './User';
import { getProfile } from '../../services/ApiServices';

jest.mock('../../services/ApiServices');

describe('User component', () => {
  beforeEach(() => {
    getProfile.mockResolvedValue({
      profile: {
        user_name: 'John Doe',
        description: 'Lorem ipsum dolor sit amet',
        country: 'USA',
        interests: 'italiana, japonesa',
        culinary_experience: 'avanzado',
      },
      image_url: 'https://example.com/avatar.png',
    });
  });

  it('should render the user profile', async () => {
    render(<User />);

    expect(screen.getByText('Cargando perfil de usuario...')).toBeInTheDocument();

    const profileData = await screen.findByText('John Doe');

    expect(profileData).toBeInTheDocument();
    expect(screen.getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Me interesa la comida...italiana, japonesa')).toBeInTheDocument();
    expect(screen.getByText('En la cocina me considero... avanzado')).toBeInTheDocument();
  });

  it('should render the default avatar if the user has no image', async () => {
    getProfile.mockResolvedValue({
      profile: {
        user_name: 'Jane Doe',
        description: 'Lorem ipsum dolor sit amet',
        country: 'Canada',
        interests: 'francesa, mexicana',
        culinary_experience: 'principiante',
      },
    });

    render(<User />);

    const avatar = await screen.findByAltText('Avatar');

    expect(avatar).toHaveAttribute('src', 'Foto.png');
  });

  it('should show an error message if the profile cannot be loaded', async () => {
    getProfile.mockRejectedValue(new Error('Network error'));

    render(<User />);

    const errorMessage = await screen.findByText('No se pudo obtener el perfil de usuario');

    expect(errorMessage).toBeInTheDocument();
  });
});