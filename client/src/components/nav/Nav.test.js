import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './Nav';

describe('Nav', () => {
  it('debe renderizar el componente Nav con enlaces', () => {
    const { getByAltText } = render(
      <Router>
        <Nav />
      </Router>
    );
    const homeLink = getByAltText('Home Icon');
    const searchLink = getByAltText('Search Icon');
    const createLink = getByAltText('Create Icon');
 

    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();
    expect(createLink).toBeInTheDocument();
 
  });

  it('debe tener enlaces correctos', () => {
    const { getByAltText } = render(
      <Router>
        <Nav />
      </Router>
    );

    const homeLink = getByAltText('Home Icon');
    const searchLink = getByAltText('Search Icon');
    const createLink = getByAltText('Create Icon');
    const profileLink = getByAltText('Login Icon');

  });
});
