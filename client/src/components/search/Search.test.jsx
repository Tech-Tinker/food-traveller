import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Search from './Search';

jest.mock('axios');

describe('Search component', () => {
  it('should render the search bar and button', () => {
    render(<Search />);
    const searchBar = screen.getByPlaceholderText('Buscar recetas...');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    expect(searchBar).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should call onSearch with the response data when the search button is clicked', async () => {
    const mockData = [{ id: 1, name: 'Pasta' }, { id: 2, name: 'Pizza' }];
    axios.get.mockResolvedValueOnce({ data: mockData });
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);
    const searchBar = screen.getByPlaceholderText('Buscar recetas...');
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.change(searchBar, { target: { value: 'pasta' } });
    fireEvent.click(searchButton);
    await waitFor(() => expect(onSearchMock).toHaveBeenCalledWith(mockData));
  });

  it('should log an error when there is an error fetching the data', async () => {
    const errorMessage = 'Error fetching data';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    console.error = jest.fn();
    render(<Search />);
    const searchButton = screen.getByRole('button', { name: 'Buscar' });
    fireEvent.click(searchButton);
    await waitFor(() => expect(console.error).toHaveBeenCalledWith(`Error al buscar: ${errorMessage}`));
  });
});