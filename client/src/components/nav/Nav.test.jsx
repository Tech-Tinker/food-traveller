import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';

describe('Nav component', () => {
  test('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );

    const homeLink = screen.getByAltText('Home Icon');
    const searchLink = screen.getByAltText('Search Icon');
    const createLink = screen.getByAltText('Create Icon');
    const profileLink = screen.getByAltText('Login Icon');

    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(createLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();
  });
});