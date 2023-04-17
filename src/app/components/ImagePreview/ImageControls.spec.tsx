import { render } from '@testing-library/react';
import ImageControls from './ImageControls';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const TestComponent = () => (
  <TransformWrapper initialScale={1}>
    <div>
      <TransformComponent>
        <div />
      </TransformComponent>
      <ImageControls imageName='testimage' />
    </div>
  </TransformWrapper>
);

describe('ImageControls', () => {
  it('should render zoom in button, zoom out button and reset button', () => {
    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('btn-zoom-in')).toBeInTheDocument();
    expect(getByTestId('btn-zoom-out')).toBeInTheDocument();
    expect(getByTestId('btn-reset')).toBeInTheDocument();
  });
});
