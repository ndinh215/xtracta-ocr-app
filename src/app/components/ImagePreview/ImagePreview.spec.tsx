import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImagePreview from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const ImagePreviewTest = ({ imageName }: { imageName: string }) => (
  <QueryClientProvider client={queryClient}>
    <ImagePreview imageName={imageName} />
  </QueryClientProvider>
);

describe('ImagePreview', () => {
  it('should render image transform box, transform controls and show highlight button', () => {
    const { queryByTestId } = render(<ImagePreviewTest imageName='testImage' />);

    expect(queryByTestId('empty-image')).toBeNull();
    expect(queryByTestId('preview-image')).toBeInTheDocument();
    expect(queryByTestId('image-controls')).toBeInTheDocument();
    expect(queryByTestId('btn-show-highlight')).toBeInTheDocument();
  });

  it('should render empty box when no image uploaded', () => {
    const { queryByTestId } = render(<ImagePreviewTest imageName='' />);

    expect(queryByTestId('empty-image')).toBeInTheDocument();
    expect(queryByTestId('preview-image')).toBeNull();
    expect(queryByTestId('image-controls')).toBeNull();
    expect(queryByTestId('btn-show-highlight')).toBeNull();
  });
});
