import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFound from './index';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('NotFound', () => {
  it('should render not found page', () => {
    const { queryByTestId } = render(<NotFound />, { wrapper: BrowserRouter });

    expect(queryByTestId('not-found-message')).toBeInTheDocument();
    expect(queryByTestId('home-page-link')).toBeInTheDocument();
  });
});
