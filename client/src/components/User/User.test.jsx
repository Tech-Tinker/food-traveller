import React from 'react';
import { render, screen } from '@testing-library/react';
import User from './User';
import { getUserById } from '../../services/ApiServices';

jest.mock('../../services/ApiServices');

describe('User component', () => {
  beforeEach(() => {
    getUserById.mockClear();
  });

  it('should render loading message when profile data is not available', () => {
    getUserById.mockResolvedValueOnce(null);

    render(<User />);

    expect(screen.getByText('Cargando perfil de usuario...')).toBeInTheDocument();
  });

  it('should render user profile data when available', async () => {
    const mockProfileData = {
      profile: {
        user_name: 'John Doe',
        country: 'USA',
        interests: 'cooking, traveling',
        culinary_experience: 'intermediate',
      },
    };
    getUserById.mockResolvedValueOnce(mockProfileData);

    render(<User />);

    expect(screen.getByText('Cargando perfil de usuario...')).toBeInTheDocument();

    await screen.findByText('John Doe');
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('USA')).toBeInTheDocument();
    expect(screen.getByText('Me interesa...cooking, traveling')).toBeInTheDocument();
    expect(screen.getByText('En la cocina me considero... intermediate')).toBeInTheDocument();
  });

  it('should handle errors when fetching user profile data', async () => {
    const mockError = new Error('Failed to fetch user profile data');
    getUserById.mockRejectedValueOnce(mockError);

    render(<User />);

    expect(screen.getByText('Cargando perfil de usuario...')).toBeInTheDocument();

    await expect(getUserById).toHaveBeenCalledTimes(1);
    expect(screen.getByText('No se pudo obtener el perfil de usuario')).toBeInTheDocument();
  });
});