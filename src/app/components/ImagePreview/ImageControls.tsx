import React, { useEffect } from 'react';
import { useControls } from 'react-zoom-pan-pinch';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconClose from '$assets/icons/icon_close.svg';
import IconZoomIn from '$assets/icons/icon_zoom_in.svg';
import IconZoomOut from '$assets/icons/icon_zoom_out.svg';
import classes from './imagePreview.module.css';

type Props = {
  imageName: string;
};

function ImageControls(props: Props) {
  const { imageName } = props;
  const { zoomIn, zoomOut, resetTransform } = useControls();

  useEffect(() => {
    resetTransform();
  }, [imageName]);

  return (
    <ButtonGroup variant='outlined' aria-label='outlined button group'>
      <Button onClick={() => zoomIn()} color='secondary' variant='contained' data-testid='btn-zoom-in'>
        <img src={IconZoomIn} alt='Zoom in' className={classes.icon} />
      </Button>
      <Button onClick={() => zoomOut()} color='secondary' variant='contained' data-testid='btn-zoom-out'>
        <img src={IconZoomOut} alt='Zoom out' className={classes.icon} />
      </Button>
      <Button onClick={() => resetTransform()} color='secondary' variant='contained' data-testid='btn-reset'>
        <img src={IconClose} alt='reset transform' className={classes.icon} />
      </Button>
    </ButtonGroup>
  );
}

export default ImageControls;
