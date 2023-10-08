import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders the button with the correct text', () => {
    render(<Button text="Click me" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('applies background color class when provided', () => {
    render(<Button text="Click me" backgroundColorClass="bg-blue" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-blue');
  });

  it('applies width class when provided', () => {
    render(<Button text="Click me" widthClass="w-50" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('w-50');
  });

  it('applies multiple classes when provided', () => {
    render(<Button text="Click me" backgroundColorClass="bg-blue" widthClass="w-50" />);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toHaveClass('bg-blue w-50');
  });
});
