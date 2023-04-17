import React, { SyntheticEvent, useMemo, useRef, useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Box from '@mui/material/Box';
import ImageControls from './ImageControls';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { useGetHighlights } from '$hooks/useORC';
import UploadService from '$infras/api/upload';

type Props = {
  imageName: string;
};

function ImagePreview(props: Props) {
  const uploadService = new UploadService();
  const { imageName } = props;
  const imageUrl = uploadService.getImageUrl(imageName);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const [imageWidth, setImageWidth] = useState<number>(0);
  const { getHighlights, isLoading, data } = useGetHighlights(imageName);

  useEffect(() => {
    // Reset image's size when the image changes
    setImageHeight(0);
    setImageWidth(0);
  }, [imageName]);

  const onImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setImageHeight(event.currentTarget.offsetHeight);
    setImageWidth(event.currentTarget.offsetWidth);
  };

  const scale = useMemo(() => {
    if (imageHeight && imageWidth && containerRef.current) {
      const displayHeight = containerRef.current.offsetHeight;
      const displayWidth = containerRef.current.offsetWidth;

      return Math.min(displayHeight / imageHeight, displayWidth / imageWidth);
    }
    return 0;
  }, [imageHeight, imageWidth]);

  const height = useMemo(() => {
    if (scale > 0) {
      return `${scale * imageHeight}px`;
    }
    return 'auto';
  }, [scale]);

  const width = useMemo(() => {
    if (scale > 0) {
      return `${scale * imageWidth}px`;
    }
    return 'auto';
  }, [scale]);

  if (!imageUrl) {
    return <Box sx={{ height: 500, width: '100%', border: '1px solid #d3e0d7' }} data-testid='empty-image' />;
  }

  return (
    <Box>
      <TransformWrapper initialScale={1} minScale={scale} maxScale={5} centerOnInit={false}>
        <Box sx={{ position: 'relative', opacity: scale ? 1 : 0 }} ref={containerRef}>
          <TransformComponent
            wrapperStyle={{ height: 500, maxHeight: 500, width: '100%', border: '1px solid #d3e0d7' }}
            contentStyle={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box
              sx={{
                position: 'relative',
                height: height,
              }}
            >
              <img
                src={imageUrl}
                alt={imageName}
                onLoad={onImageLoad}
                height={height}
                width={width}
                data-testid='preview-image'
              />
              {data?.map((word, index) => {
                const { WordText, Left, Top, Height, Width } = word;

                return (
                  <Box
                    data-testid='highlight-box'
                    key={WordText + index}
                    sx={{
                      position: 'absolute',
                      height: `${Height * scale}px`,
                      width: `${Width * scale}px`,
                      left: `${Left * scale}px`,
                      top: `${Top * scale}px`,
                      backgroundColor: 'primary.main',
                      opacity: 0.4,
                      border: '1px solid',
                      borderColor: 'primary.dark',
                    }}
                  />
                );
              })}
            </Box>
          </TransformComponent>
          <Box
            sx={{ position: 'absolute', bottom: 10, width: '100%', display: 'flex', justifyContent: 'center' }}
            data-testid='image-controls'
          >
            <ImageControls imageName={imageName} />
          </Box>
        </Box>
      </TransformWrapper>

      <Stack direction='row' justifyContent='center' sx={{ mt: 1 }}>
        <LoadingButton
          variant='contained'
          color='info'
          loading={isLoading}
          onClick={() => getHighlights(imageName)}
          data-testid='btn-show-highlight'
        >
          Show highlight
        </LoadingButton>
      </Stack>
    </Box>
  );
}

export default ImagePreview;
