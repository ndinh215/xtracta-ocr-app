import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUpload from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const FileUploadTest = () => (
  <QueryClientProvider client={queryClient}>
    <FileUpload onUploadSuccess={(imageName) => imageName} />
  </QueryClientProvider>
);

describe('FileUpload', () => {
  it('should render input image and upload button', () => {
    const { queryByTestId } = render(<FileUploadTest />);

    expect(queryByTestId('input-image')).toBeInTheDocument();
    expect(queryByTestId('btn-upload')).toBeInTheDocument();
  });
});
