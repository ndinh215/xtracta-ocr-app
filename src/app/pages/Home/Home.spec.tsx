import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const HomeTest = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

describe('Home', () => {
  it('should render file upload and image preview components', () => {
    const { queryByTestId } = render(<HomeTest />);

    expect(queryByTestId('file-upload')).toBeInTheDocument();
    expect(queryByTestId('image-preview')).toBeInTheDocument();
  });
});
